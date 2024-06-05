/**
 * Contacts screen.
 */
import { NavBar } from '@/components/NavBar'
import { UserCard } from '@/components/UserCard'
import { AddIcon } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { fetchContactsFirebase } from '@/Firebase/Contacts'

export default function Contacts() {
  const [contacts, setContacts] = useState<Array<any>>([])

  // Fetch contacts from Firebase.
  useEffect(() => {
    fetchContactsFirebase(setContacts)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>All contacts</Text>
        {contacts.length === 0 ? (
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#9E9E9E' }}>
            You don't add any contact!
          </Text>
        ) : (
          <ScrollView
            style={styles.contacts}
            showsVerticalScrollIndicator={false}
          >
            {contacts.map(contact => (
              <View style={styles.contact} key={contact.uid}>
                <UserCard
                  key={contact.uid}
                  name={contact.name || 'Unnamed User'}
                  message={contact.email}
                  contactId={contact.uid}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.bottomBar}>
        <Link
          href='/addContacts'
          style={{
            alignSelf: 'flex-end',
          }}
        >
          <View style={styles.addIcon}>
            <AddIcon color='white' w='$7' h='$7' />
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
    paddingHorizontal: 20,
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
  contact: {
    flex: 1,
    marginBottom: 20,
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
