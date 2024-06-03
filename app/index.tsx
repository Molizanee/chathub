import { View, Text, StyleSheet } from 'react-native'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { KeyboardAvoidingView } from '@gluestack-ui/themed'
import useUserStore from '@/store/userStore'

export default function LoginScreen() {
  const { setUser } = useUserStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = FIREBASE_AUTH

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        router.push('/chatList')
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSignIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => router.push('/chatList'))
      .catch(error => {
        console.error('Error signing in:', setError(error.message))
      })
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 7000)
    }
  }, [error])

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      {error && (
        <Text
          style={{
            position: 'absolute',
            color: 'red',
            fontSize: 16,
            marginTop: 140,
            top: 0,
            alignSelf: 'center',
          }}
        >
          User e-mail or password incorrect!
        </Text>
      )}
      <View style={styles.headerAndSubTitle}>
        <Text style={styles.header}>ChatHub</Text>
        <Text style={styles.subTitle}>A place to talk.</Text>
      </View>
      <View style={styles.content}>
        <Input
          placeholder='Your E-mail'
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder='Your Password'
          secureText
          value={password}
          onChangeText={setPassword}
        />
        <Button
          style='primary'
          isDisabled={false}
          isFocusVisible={false}
          text='Login'
          onPressed={() => handleSignIn(email, password)}
        />

        <Text style={styles.footer}>Don't have an account?</Text>

        <Button
          isDisabled={false}
          isFocusVisible={false}
          style='secondary'
          text='Sign Up'
          onPressed={() => router.push('/createAccount')}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 30,
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0FA6FA',
  },
  subTitle: {
    fontSize: 24,
    color: '#9E9E9E',
  },
  headerAndSubTitle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 11,
  },
  footer: {
    fontSize: 20,
    color: '#9E9E9E',
  },
  content: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
})
