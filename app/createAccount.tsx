import { Text, View, StyleSheet } from 'react-native'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { FIREBASE_DB as db } from '@/FirebaseConfig'

export default function CreateAccountScreen() {
  const auth = FIREBASE_AUTH
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = (email: string, password: string) => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user
          setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            contacts: [],
          })
          router.push('/chatList')
        })
        .catch(error => {
          setError(error.message)
        })
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 15000)
    }
  }, [error])

  return (
    <View style={styles.container}>
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
          {error === 'Firebase: Error (auth/email-already-in-use).'
            ? 'Email already in use.'
            : 'Invalid e-mail or password'}
        </Text>
      )}
      <View style={styles.headerAndSubTitle}>
        <Text style={styles.header}>ChatHub</Text>
        <Text style={styles.subTitle}>Create your account</Text>
      </View>
      <View style={styles.content}>
        <Input placeholder='Your Name' value={name} onChangeText={setName} />
        <Input
          placeholder='Your E-mail'
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder='Your Password'
          value={password}
          onChangeText={setPassword}
        />
        <Button
          style='primary'
          isDisabled={false}
          isFocusVisible={false}
          text='Create my account!'
          onPressed={() => handleSignUp(email, password)}
        />

        <Text style={styles.footer}>Already a member?</Text>

        <Button
          isDisabled={false}
          isFocusVisible={false}
          style='secondary'
          text='Login'
          onPressed={() => router.push('/')}
        />
      </View>
    </View>
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
