import { Input } from '@/components/Input'
import { NavBar } from '@/components/NavBar'
import { UserCard } from '@/components/UserCard'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FIREBASE_DB as db } from '@/FirebaseConfig'
import useUserStore from '@/store/userStore'

export default function ChatListScreen() {
  const [chats, setChats] = useState([])
  const [filter, setFilter] = useState('')
  const auth = FIREBASE_AUTH

  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid
      const chatsRef = collection(db, 'chats')
      const q = query(chatsRef, where('participants', 'array-contains', uid))

      const unsubscribe = onSnapshot(
        q,
        async snapshot => {
          const chatsData = await Promise.all(
            snapshot.docs.map(async document => {
              const data = document.data()
              const otherParticipants = data.participants.filter(p => p !== uid)

              const userDetails = await Promise.all(
                otherParticipants.map(async participantUid => {
                  try {
                    const userRef = doc(db, 'users', participantUid)
                    const userSnap = await getDoc(userRef)
                    return userSnap.exists()
                      ? { uid: participantUid, ...userSnap.data() }
                      : {
                          uid: participantUid,
                          name: 'Unknown User',
                          email: 'No email',
                        }
                  } catch (error) {
                    console.error('Failed to fetch user details', error)
                    return {
                      uid: participantUid,
                      name: 'Unknown User',
                      email: 'No email',
                    }
                  }
                })
              )

              return {
                id: document.id,
                lastMessage: data.lastMessage?.text,
                timestamp:
                  data.lastMessage?.timestamp?.toDate().toString() ||
                  'Unknown time',
                name: userDetails[0]?.name,
                email: userDetails[0]?.email,
                otherUid: userDetails[0]?.uid,
              }
            })
          )

          // Filter out chats where lastMessage is either an empty string or undefined
          const filteredChats = chatsData.filter(
            chat => chat.lastMessage && chat.lastMessage.trim() !== ''
          )
          setChats(filteredChats)
        },
        error => {
          console.error('Failed to subscribe to chat updates', error)
        }
      )

      return () => unsubscribe()
    }
  }, [auth.currentUser])

  const filteredChats = chats.filter(
    chat =>
      chat.name.toLowerCase().includes(filter.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Input
          placeholder='Find a conversation...'
          value={filter}
          onChangeText={setFilter}
        />
        {chats[0]?.lastMessage === '' || chats[0]?.lastMessage === undefined ? (
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#9E9E9E' }}>
            You don't start any chat!
          </Text>
        ) : (
          <View style={styles.messages}>
            {filteredChats.map(chat => (
              <UserCard
                key={chat.id}
                name={chat.name}
                message={chat.lastMessage}
                contactId={chat.otherUid}
              />
            ))}
          </View>
        )}
      </View>
      <NavBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
  messages: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
})
