import type { ComponentProps } from 'react'

import { Alert, CloseButton } from '@vezham/react-v3'

type Props = {
  className: string
  message: string
  status: ComponentProps<typeof Alert>['status']
  onClose: () => void
}

export const PageToast = ({ className, message, status, onClose }: Props) => (
  <div className={className}>
    <Alert status={status}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{message}</Alert.Title>
      </Alert.Content>
      <CloseButton onClick={onClose} />
    </Alert>
  </div>
)
