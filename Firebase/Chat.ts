/**
 * Functions to manage chat functionalities using Firebase Firestore.
 */
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { FIREBASE_DB as db, FIREBASE_AUTH } from './FirebaseConfig'
import { ChatData, CompleteMessage, User } from './Types'
const auth = FIREBASE_AUTH

export type SetChatsFunction = (chats: ChatData[]) => void

// Retrieves and subscribes to the chat list of the current user.

export const getChatListFirebase = async (
  setChats: SetChatsFunction
): Promise<() => void> => {
  if (auth.currentUser) {
    return subscribeToChatsFirebase(auth.currentUser.uid, setChats)
  } else {
    return () => {}
  }
}

// Subscribes to chat updates for a specific user.

export const subscribeToChatsFirebase = (
  uid: string,
  setChats: SetChatsFunction
) => {
  const chatsRef = collection(db, 'chats')
  const q = query(chatsRef, where('participants', 'array-contains', uid))

  const unsubscribe = onSnapshot(
    q,
    snapshot => processChatSnapshotFirebase(snapshot, uid, setChats),
    error => console.error('Failed to subscribe to chat updates', error)
  )

  return () => unsubscribe()
}

// Processes the snapshot of chat documents, updating the chat list.

export const processChatSnapshotFirebase = async (
  snapshot: QuerySnapshot<DocumentData>,
  uid: string,
  setChats: SetChatsFunction
): Promise<void> => {
  const chatsData = await Promise.all(
    snapshot.docs.map(document => createChatDataFirebase(document, uid))
  )

  const sortedChats = sortChatsByUpdatedTimeFirebase(chatsData)
  const filteredChats = filterChatsByMessageFirebase(sortedChats)
  setChats(filteredChats)
}

// Creates a chat data object from a Firestore document.

export const createChatDataFirebase = async (
  document: DocumentData,
  uid: string
): Promise<ChatData> => {
  const data = document.data()
  const otherParticipants = data.participants.filter((p: string) => p !== uid)
  const userDetails = await getParticipantDetailsFirebase(otherParticipants)

  return {
    id: document.id,
    lastMessage: data.lastMessage?.text,
    lastUpdated: data.lastUpdated?.toDate() || new Date(),
    timestamp: data.lastMessage?.timestamp?.toDate() || new Date(),
    name: userDetails[0]?.name,
    email: userDetails[0]?.email,
    otherUid: userDetails[0]?.uid,
  }
}

// Retrieves the details of a list of participants.

export const getParticipantDetailsFirebase = async (
  participantUids: string[]
): Promise<{ uid: string; name?: string; email?: string }[]> => {
  return Promise.all(
    participantUids.map(async uid => {
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)
      return userSnap.exists()
        ? { uid, ...userSnap.data() }
        : { uid, name: 'Unknown User', email: 'No email' }
    })
  )
}

// Sorts chat data by the time of the last message.

export const sortChatsByUpdatedTimeFirebase = (
  chatsData: ChatData[]
): ChatData[] => {
  return chatsData.sort(
    (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
  )
}

// Filters chat data by the presence of a last message.

export const filterChatsByMessageFirebase = (
  chatsData: ChatData[]
): ChatData[] => {
  return chatsData.filter(
    chat => chat.lastMessage && chat.lastMessage.trim() !== ''
  )
}

// Creates a new chat document in Firestore.
// If the chat already exists, it returns the chat ID.

export const checkAndCreateChatFirebase = async (
  id: string,
  setChatId: (id: string) => void,
  setOtherParticipant: (participant: User | null) => void
) => {
  if (auth.currentUser) {
    const currentUserUid = auth.currentUser.uid
    const chatsRef = collection(db, 'chats')
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUserUid)
    )
    const querySnapshot = await getDocs(q)
    const chat = querySnapshot.docs.find(doc =>
      doc.data().participants.includes(id)
    )

    if (chat) {
      setChatId(chat.id)
      const otherUid = chat
        .data()
        .participants.find((uid: string) => uid !== currentUserUid)
      const otherUserRef = doc(db, 'users', otherUid)
      const otherUserSnap = await getDoc(otherUserRef)
      if (otherUserSnap.exists()) {
        setOtherParticipant(otherUserSnap.data() as User)
      }
    } else {
      const newChatRef = await addDoc(chatsRef, {
        participants: [currentUserUid, id],
        createdAt: serverTimestamp(),
        lastMessage: { text: '', sentBy: '', timestamp: serverTimestamp() },
      })
      setChatId(newChatRef.id)
    }
  }
}

// Subscribes to messages for a specific chat.
// It updates the messages state with the latest messages.
// It returns an unsubscribe function to stop listening to messages.

export const subscribeToMessagesFirebase = (
  chatId: string,
  setMessages: (messages: CompleteMessage[]) => void
) => {
  if (!chatId) return () => {}

  return onSnapshot(collection(db, 'chats', chatId, 'messages'), snapshot => {
    const loadedMessages: CompleteMessage[] = snapshot.docs
      .map(doc => ({
        id: doc.id,
        timestamp: doc.data().timestamp,
        ...doc.data(),
        text: doc.data().text,
        sentBy: doc.data().sentBy,
      }))
      .sort((a, b) => a.timestamp - b.timestamp)
    setMessages(loadedMessages)
  })
}

// Sends a new message to a specific chat.
// It updates the chat's last message and last updated time.

export const sendMessageFirebase = async (
  chatId: string,
  newMessage: string,
  setNewMessage: (message: string) => void
) => {
  if (newMessage.trim() === '' || !chatId) return

  const messageRef = collection(db, 'chats', chatId, 'messages')
  await addDoc(messageRef, {
    text: newMessage,
    sentBy: auth.currentUser?.uid,
    timestamp: serverTimestamp(),
  })

  await updateDoc(doc(db, 'chats', chatId), {
    lastUpdated: serverTimestamp(),
    lastMessage: {
      text: newMessage,
      sentBy: auth.currentUser?.uid,
      timestamp: serverTimestamp(),
    },
  })

  setNewMessage('')
}
