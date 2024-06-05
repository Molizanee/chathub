/**
 * Authentication functions for Firebase
 */
import { router } from 'expo-router'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { FIREBASE_DB as db, FIREBASE_AUTH as auth } from './FirebaseConfig'

// Sign in a user using Firebase authentication.

export const signInFirebase = (
  email: string,
  password: string,
  onError: (error: string) => void
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => router.push('/chatList'))
    .catch(error => {
      console.error('Error signing in:', onError(error.message))
    })
}

// Sign up a user using Firebase authentication.
// This function also creates a user document in Firestore.

export const signUpFirebase = (
  name: string,
  email: string,
  password: string,
  onError: (error: string) => void
) => {
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
        onError(error.message)
      })
  } catch (error) {
    console.error('Error signing up:', error)
  }
}

// Sign out a user using Firebase authentication.

export const signOutFirebase = () => {
  signOut(auth)
    .then(() => {
      router.push('/')
    })
    .catch(error => {
      console.error('Error signing out:', error)
    })
}
