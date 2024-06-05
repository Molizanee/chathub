/**
 * Settings screen.
 */
import { NavBar } from '@/components/NavBar'
import { signOutFirebase } from '@/Firebase/Auth'
import { Button, ButtonText } from '@gluestack-ui/themed'
import { Text, View, StyleSheet } from 'react-native'

const handleLogout = async () => {
  await signOutFirebase()
}

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.content}>
        <Button onPress={handleLogout} style={styles.button}>
          <ButtonText color='#FFFF'>Log-out</ButtonText>
        </Button>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0FA6FA',
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 15,
    alignItems: 'center',
  },
})
