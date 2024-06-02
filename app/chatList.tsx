import { Input } from '@/components/Input'
import { NavBar } from '@/components/NavBar'
import { UserCard } from '@/components/UserCard'
import { Text, View, StyleSheet } from 'react-native'

export default function ChatListScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Input placeholder='Find a conversation' />
        <View style={styles.messages}>
          <UserCard name='David Molizane' message='I am coding...' />
          <UserCard name='David Molizane' message='I am coding...' />
          <UserCard name='David Molizane' message='I am coding...' />
          <UserCard name='David Molizane' message='I am coding...' />
        </View>
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
    paddingHorizontal: 40,
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
