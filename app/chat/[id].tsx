import { Input } from '@/components/Input'
import { Message } from '@/components/Message'
import {
  AddIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
} from '@gluestack-ui/themed'
import { Link, useLocalSearchParams } from 'expo-router'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { FIREBASE_DB as db, FIREBASE_AUTH } from '@/FirebaseConfig'

export default function ConversationScreen() {
  const auth = FIREBASE_AUTH
  const [chatId, setChatId] = useState('')
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [otherParticipant, setOtherParticipant] = useState({
    name: 'User',
    uid: '',
  })

  const { id } = useLocalSearchParams()

  useEffect(() => {
    const checkAndCreateChat = async () => {
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
            .participants.find(uid => uid !== currentUserUid)
          const otherUserRef = doc(db, 'users', otherUid)
          const otherUserSnap = await getDoc(otherUserRef)
          if (otherUserSnap.exists()) {
            setOtherParticipant(otherUserSnap.data())
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

    console.log(otherParticipant)
    checkAndCreateChat()
  }, [id])

  useEffect(() => {
    if (chatId) {
      const unsubscribe = onSnapshot(
        collection(db, 'chats', chatId, 'messages'),
        snapshot => {
          const loadedMessages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          setMessages(loadedMessages.sort((a, b) => a.timestamp - b.timestamp))
        }
      )

      return () => unsubscribe() // Cleanup subscription on unmount
    }
  }, [chatId])

  const handleSend = async () => {
    if (newMessage.trim() === '' || !chatId) return

    const messageRef = collection(db, 'chats', chatId, 'messages')
    await addDoc(messageRef, {
      text: newMessage,
      sentBy: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    })

    await updateDoc(doc(db, 'chats', chatId), {
      lastUpdated: serverTimestamp(),
      lastMessage: {
        text: newMessage,
        sentBy: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      },
    })

    setNewMessage('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Link href='/chatList' style={styles.iconBack}>
          <ArrowLeftIcon color='#9E9E9E' height={'$7'} width={'$7'} />
        </Link>
        <View style={styles.header}>
          <Avatar bgColor='#0FA6FA' size='lg'>
            <AvatarFallbackText>{otherParticipant.name[0]}</AvatarFallbackText>
            <AvatarBadge $dark-borderColor='$black' />
          </Avatar>
          <Text style={styles.userName}>{otherParticipant.name}</Text>
        </View>
        <ScrollView>
          {messages.map(msg => (
            <Message
              key={msg.id}
              dateSend={
                msg.timestamp ? msg.timestamp.toDate().toString() : 'Loading...'
              }
              message={msg.text}
              userName={
                msg.sentBy === auth.currentUser.uid
                  ? 'You'
                  : otherParticipant.name
              }
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputAndIcon}>
        <Input
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder='New Message...'
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendIcon}>
          <ArrowUpIcon color='white' w='$7' h='$7' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
    gap: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    width: '100%',
  },
  iconBack: {
    alignSelf: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0FA6FA',
  },
  inputAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    paddingHorizontal: 40,
  },
  sendIcon: {
    backgroundColor: '#0FA6FA',
    height: 60,
    width: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
