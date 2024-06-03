import { NavBar } from '@/components/NavBar'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import useUserStore from '@/store/userStore'
import { Button, ButtonText } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { signOut } from 'firebase/auth'
import { Text, View } from 'react-native'

const auth = FIREBASE_AUTH

function handleLogout() {
  signOut(auth)
    .then(() => {
      router.push('/')
    })
    .catch(error => {
      console.error('Error signing out:', error)
    })
}

export default function Settings() {
  const { user } = useUserStore()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 25,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: '500',
          color: '#0FA6FA',
          alignSelf: 'flex-start',
        }}
      >
        Settings
      </Text>
      {user?.email && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: '#9E9E9E',
            alignSelf: 'flex-start',
            marginTop: 15,
          }}
        >
          {`Your e-mail: ${(user as { email: string }).email || 'No user'}`}
        </Text>
      )}

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          onPress={handleLogout}
          style={{
            backgroundColor: 'red',
            borderRadius: 15,
            alignItems: 'center',
          }}
        >
          <ButtonText color='#FFFF'>Log-out</ButtonText>
        </Button>
      </View>
      <NavBar />
    </View>
  )
}
