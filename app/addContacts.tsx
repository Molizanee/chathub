import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { NavBar } from '@/components/NavBar'
import { ArrowLeftIcon } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { handleAddContactFirebase } from '@/Firebase/Contacts'

export default function AddContacts() {
  const [email, setEmail] = useState('')

  const handleAddContact = async () => {
    handleAddContactFirebase(email, setEmail)
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
