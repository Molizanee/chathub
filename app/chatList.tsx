import { Input } from '@/components/Input'
import { NavBar } from '@/components/NavBar'
import { UserCard } from '@/components/UserCard'
import { getChatListFirebase } from '@/Firebase/Chat'
import { ChatData } from '@/Firebase/Types'
import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

export default function ChatListScreen() {
  const [chats, setChats] = useState<ChatData[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    // Subscribe to chat updates
    const fetchAndUnsubscribe = async () => {
      const unsubscribe = await getChatListFirebase(setChats)

      // Clean up the subscription when the component unmounts
      return unsubscribe
    }
    fetchAndUnsubscribe()
  }, [])

  // Filter chats based on user input
  const filteredChats = chats.filter(
    chat =>
      chat.name?.toLowerCase().includes(filter.toLowerCase()) ||
      chat.email?.toLowerCase().includes(filter.toLowerCase())
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
            Add a contact to start a chat!
          </Text>
        ) : (
          <ScrollView style={styles.messages}>
            {filteredChats.map(chat => (
              <UserCard
                key={chat.id}
                name={chat.name}
                message={chat.lastMessage}
                date={chat.lastUpdated.toLocaleString()}
                contactId={chat.otherUid}
              />
            ))}
          </ScrollView>
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
    width: '100%',
  },
})
