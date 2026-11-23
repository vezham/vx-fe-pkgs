import {
  NewDeviceEmail as NewDeviceEmailPrimitive,
  type NewDeviceEmailProps
} from '@vezham/auth-ui-react/email'
import { cn } from '@vezham/styles-v3'

export type { NewDeviceEmailProps } from '@vezham/auth-ui-react/email'

export const NewDeviceEmail = ({
  colors,
  classNames,
  ...props
}: NewDeviceEmailProps) => {
  return (
    <NewDeviceEmailPrimitive
      colors={{
        light: {
          background: '#F5F5F5',
          primary: '#0285F7',
          primaryForeground: '#FCFCFC',
          ...colors?.light
        },
        dark: {
          background: '#060607',
          primary: '#0584F6',
          primaryForeground: '#FCFCFC',
          ...colors?.dark
        }
      }}
      classNames={{
        ...classNames,
        card: cn('rounded-3xl border-none', classNames?.card),
        button: cn('rounded-full', classNames?.button)
      }}
      {...props}
    />
  )
}
