import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { NavBar } from '@/components/NavBar'
import { ArrowLeftIcon } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FIREBASE_DB as db, FIREBASE_AUTH } from '@/FirebaseConfig'

export default function AddContacts() {
  const [email, setEmail] = useState('')
  const auth = FIREBASE_AUTH
  const handleAddContact = async () => {
    if (email) {
      try {
        // Query for user by email
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('email', '==', email))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const userToAdd = querySnapshot.docs[0] // Assuming email is unique and only one doc should be returned
          const userDocRef = doc(db, 'users', auth.currentUser.uid)

          // Update current user's contacts to include new contact's UID
          await updateDoc(userDocRef, {
            contacts: arrayUnion(userToAdd.id), // Adding UID instead of email
          })

          alert('Contact added successfully!')
          setEmail('')
        } else {
          alert('No user found with that email')
        }
      } catch (error) {
        console.error('Failed to add contact: ', error)
        alert('Failed to add contact')
      }
    } else {
      alert('Please enter a valid email address')
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          gap: 20,
          width: '100%',
        }}
      >
        <Link href='/chatList' style={styles.iconBack}>
          <ArrowLeftIcon color='#9E9E9E' height={'$7'} width={'$7'} />
        </Link>
        <View style={styles.content}>
          <Text style={styles.header}>Add new contact</Text>
          <Input
            placeholder='Contact e-mail'
            value={email}
            onChangeText={setEmail}
          />
          <Button
            text='Create new contact'
            style='primary'
            onPressed={() => handleAddContact()}
          />
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
  },
  content: {
    flexDirection: 'column',
    width: '100%',
    gap: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0FA6FA',
  },
  iconBack: {
    alignSelf: 'flex-start',
  },
})
