import { Avatar, AvatarBadge, AvatarFallbackText } from '@gluestack-ui/themed'
import { Text, View } from 'react-native'

interface MessageProps {
  message: string
  dateSend: string
  userName: string
}

export const Message = ({ message, dateSend, userName }: MessageProps) => {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        borderColor: '#F3F3F3',
        borderWidth: 1,
        shadowOpacity: 0.1,
        width: '100%',
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: '#9E9E9E',
          fontWeight: '400',
          marginBottom: 5,
        }}
      >
        {message}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: '#9E9E9E',
          }}
        >
          {dateSend}
        </Text>
        <Avatar bgColor='#0FA6FA' size='sm'>
          <AvatarFallbackText>{userName[0]}</AvatarFallbackText>
          <AvatarBadge $dark-borderColor='$black' />
        </Avatar>
      </View>
    </View>
  )
}
