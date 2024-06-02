import { Input as InputLib, InputField } from '@gluestack-ui/themed'

interface InputProps {
  isDisabled?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  placeholder: string
  value?: string
  secureText?: boolean
  onChangeText?: (text: string) => void
}

export const Input = ({
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  placeholder,
  value,
  onChangeText,
  secureText = false,
}: InputProps) => {
  return (
    <InputLib
      variant='rounded'
      size='lg'
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      style={{
        width: '100%',
        height: 60,
        borderRadius: 15,
        backgroundColor: '#F3F3F3',
        borderColor: '#F3F3F3',
      }}
    >
      <InputField
        placeholder={placeholder}
        color='#9E9E9E'
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureText}
      />
    </InputLib>
  )
}
