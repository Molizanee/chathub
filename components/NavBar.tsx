import {
  AtSignIcon,
  Icon,
  MessageCircleIcon,
  SettingsIcon,
  ShareIcon,
} from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'

export const NavBar = () => {
  const route = useRoute()
  const routeName = route.name

  return (
    <View style={styles.container}>
      <Link style={styles.iconLink} href='/chatList' asChild>
        <Icon
          as={MessageCircleIcon}
          m='$2'
          w='$10'
          h='$10'
          color={routeName === 'chatList' ? '#0FA6FA' : '#9E9E9E'}
        />
      </Link>
      <Link style={styles.iconLink} href='/contacts' asChild>
        <Icon
          as={AtSignIcon}
          m='$2'
          w='$10'
          h='$10'
          color={routeName === 'contacts' ? '#0FA6FA' : '#9E9E9E'}
        />
      </Link>
      <Link style={styles.iconLink} href='/settings' asChild>
        <Icon
          as={SettingsIcon}
          m='$2'
          w='$10'
          h='$10'
          color={routeName === 'settings' ? '#0FA6FA' : '#9E9E9E'}
        />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    shadowRadius: 10,
    width: '100%',
    borderRadius: 15,
    padding: 10,
  },
  iconLink: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
