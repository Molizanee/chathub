import { NavBar } from '@/components/NavBar'
import { UserCard } from '@/components/UserCard'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { AddIcon } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FIREBASE_DB as db } from '@/FirebaseConfig'

export default function Contacts() {
  const auth = FIREBASE_AUTH
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const fetchContacts = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userDocRef)
        if (docSnap.exists()) {
          const userData = docSnap.data()
          const contactsPromises = userData.contacts.map(async contactUid => {
            const contactDocRef = doc(db, 'users', contactUid)
            const contactDocSnap = await getDoc(contactDocRef)
            if (contactDocSnap.exists()) {
              return { uid: contactUid, ...contactDocSnap.data() }
            }
            return null
          })
          const contactsDetails = await Promise.all(contactsPromises)
          setContacts(contactsDetails.filter(Boolean)) // Filter out any nulls from failed fetches
        } else {
          console.log('No such document!')
        }
      }
    }
    fetchContacts()
  }, [auth.currentUser])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>All contacts</Text>
        <View style={styles.contacts}>
          {contacts.map((contact, index) => (
            <UserCard
              key={index}
              name={contact.name || 'Unnamed User'} // Default name if not available
              message={contact.email} // Display email in the message field
              contactId={contact.uid} // Pass the UID as contactId
            />
          ))}
        </View>
      </View>
      <View style={styles.bottomBar}>
        <Link
          href='/addContacts'
          style={{
            alignSelf: 'flex-end',
          }}
        >
          <View style={styles.addIcon}>
            <AddIcon color='white' />
          </View>
        </Link>
        <NavBar />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    paddingTop: 60,
    paddingBottom: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0FA6FA',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
  contacts: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
  bottomBar: {
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  addIcon: {
    alignSelf: 'flex-end',
    backgroundColor: '#0FA6FA',
    borderRadius: 15,
    padding: 20,
  },
})
