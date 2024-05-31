import { Stack } from 'expo-router'
import { GluestackUIProvider, Text, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GluestackUIProvider>
  )
}
