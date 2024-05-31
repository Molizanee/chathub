import { View, Text, StyleSheet } from 'react-native'
import {
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonIcon,
  ButtonSpinner,
  ButtonGroup,
} from '@gluestack-ui/themed'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerAndSubTitle}>
        <Text style={styles.header}>ChatHub</Text>
        <Text style={styles.subTitle}>A place to talk.</Text>
      </View>
      <View style={styles.content}>
        <Input
          variant='rounded'
          size='lg'
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          style={{
            width: '100%',
            height: 60,
            borderRadius: 15,
            backgroundColor: '#F3F3F3',
            borderColor: '#F3F3F3',
          }}
        >
          <InputField placeholder='Your E-mail' color='#9E9E9E' />
        </Input>
        <Input
          variant='rounded'
          size='lg'
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          style={{
            width: '100%',
            height: 60,
            borderRadius: 15,
            backgroundColor: '#F3F3F3',
            borderColor: '#F3F3F3',
          }}
        >
          <InputField placeholder='Your Password' color='#9E9E9E' />
        </Input>
        <Button
          size='lg'
          width='$full'
          variant='solid'
          action='primary'
          isDisabled={false}
          isFocusVisible={false}
          style={{
            backgroundColor: '#0FA6FA',
            height: 60,
            borderRadius: 15,
          }}
        >
          <ButtonText>Login</ButtonText>
        </Button>
        <Text style={styles.footer}>Don't have an account?</Text>
        <Button
          size='lg'
          width='$full'
          variant='solid'
          action='primary'
          isDisabled={false}
          isFocusVisible={false}
          style={{
            backgroundColor: '#FFFF',
            height: 60,
            borderColor: '#0FA6FA',
            borderWidth: 1,

            borderRadius: 15,
          }}
        >
          <ButtonText color='#0FA6FA'>Login</ButtonText>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 30,
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0FA6FA',
  },
  subTitle: {
    fontSize: 24,
    color: '#9E9E9E',
  },
  headerAndSubTitle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 11,
  },
  footer: {
    fontSize: 20,
    color: '#9E9E9E',
  },
  content: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
})
