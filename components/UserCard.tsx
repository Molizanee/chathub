import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  Heading,
  HStack,
  VStack,
} from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'

interface UserCardProps {
  image?: string
  name: string
  message?: string
  contactId: string
}

export const UserCard = ({ name, message, contactId }: UserCardProps) => {
  return (
    <Link
      href={{
        pathname: `/chat/${contactId}`, // Dynamic routing based on the chatId
      }}
    >
      <VStack space='2xl'>
        <HStack space='md'>
          <Avatar bgColor='#0FA6FA' size='lg'>
            <AvatarFallbackText>{name[0]}</AvatarFallbackText>
            <AvatarBadge $dark-borderColor='$black' />
          </Avatar>
          <VStack
            style={{
              maxWidth: '80%',
            }}
          >
            <Heading
              style={{ fontSize: 20, fontWeight: '500', color: '#0FA6FA' }}
            >
              {name}
            </Heading>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '400',
                color: '#9E9E9E',
              }}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {message}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0FA6FA',
  },
  lastMessage: {
    fontSize: 20,
    color: '#9E9E9E',
  },
})
