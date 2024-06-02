import { Stack } from 'expo-router'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='chatList' />
        <Stack.Screen name='index' />
        <Stack.Screen name='createAccount' />
        <Stack.Screen name='chat' />
        <Stack.Screen name='contacts' />
        <Stack.Screen name='addContacts' />
        <Stack.Screen name='settings' />
      </Stack>
    </GluestackUIProvider>
  )
}
