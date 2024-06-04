import { Input } from '@/components/Input'
import { Message } from '@/components/Message'
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
} from '@gluestack-ui/themed'
import { Link, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {
  checkAndCreateChatFirebase,
  sendMessageFirebase,
  subscribeToMessagesFirebase,
} from '@/Firebase/Chat'
import { CompleteMessage, Message as MessageType, User } from '@/Firebase/Types'
import { FIREBASE_AUTH } from '@/Firebase/FirebaseConfig'

export default function ConversationScreen() {
  const [chatId, setChatId] = useState('')
  const [messages, setMessages] = useState<CompleteMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [otherParticipant, setOtherParticipant] = useState<User | null>({
    uid: '',
    email: '',
    name: 'User',
  })

  const { id }: { id: string } = useLocalSearchParams() ?? {
    id: '',
  }

  useEffect(() => {
    checkAndCreateChatFirebase(id, setChatId, setOtherParticipant)
  }, [id])

  useEffect(() => {
    if (chatId) {
      subscribeToMessagesFirebase(chatId, setMessages)
    }
  }, [chatId])

  const handleSend = async () => {
    sendMessageFirebase(chatId, newMessage, setNewMessage)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Link href='/chatList' style={styles.iconBack}>
          <ArrowLeftIcon color='#9E9E9E' height={'$7'} width={'$7'} />
        </Link>
        <View style={styles.header}>
          <Avatar bgColor='#0FA6FA' size='lg'>
            <AvatarFallbackText>{otherParticipant?.name[0]}</AvatarFallbackText>
            <AvatarBadge $dark-borderColor='$black' />
          </Avatar>
          <Text style={styles.userName}>{otherParticipant?.name}</Text>
        </View>
        <ScrollView>
          {messages.map(msg => (
            <Message
              key={msg.id}
              dateSend={
                msg.timestamp ? msg.timestamp.toLocaleString() : 'Loading...'
              }
              message={msg.text}
              userName={
                msg.sentBy !== FIREBASE_AUTH?.currentUser?.uid
                  ? otherParticipant?.name
                  : 'You'
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
