import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCiHTt1ZbP2CILiG7MO-VnDDIZbUwMuyMY',
  authDomain: 'chathub-e74f4.firebaseapp.com',
  projectId: 'chathub-e74f4',
  storageBucket: 'chathub-e74f4.appspot.com',
  messagingSenderId: '477985381153',
  appId: '1:477985381153:web:f195c2752656b41636bc60',
  measurementId: 'G-5KWY0H8KFY',
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
