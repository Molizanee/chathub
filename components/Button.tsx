import { Button as ButtonLib, ButtonText } from '@gluestack-ui/themed'

interface ButtonProps {
  style: 'primary' | 'secondary'
  isDisabled?: boolean
  isFocusVisible?: boolean
  text: string
  onPressed?: () => void
}

export const Button = ({
  isDisabled = false,
  isFocusVisible = false,
  text,
  style,
  onPressed = () => {},
}: ButtonProps) => {
  return (
    <ButtonLib
      size='lg'
      width='$full'
      variant='solid'
      action='primary'
      isDisabled={isDisabled}
      isFocusVisible={isFocusVisible}
      onPress={onPressed}
      style={
        style === 'primary'
          ? {
              backgroundColor: '#0FA6FA',
              height: 60,
              borderRadius: 15,
            }
          : {
              backgroundColor: '#FFFF',
              height: 60,
              borderColor: '#0FA6FA',
              borderWidth: 1,
              borderRadius: 15,
            }
      }
    >
      <ButtonText
        color={style === 'primary' ? '#FFFF' : '#0FA6FA'}
        fontWeight={600}
      >
        {text}
      </ButtonText>
    </ButtonLib>
  )
}
