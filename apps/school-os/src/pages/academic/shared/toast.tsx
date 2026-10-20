import { Alert, CloseButton } from '@vezham/react-v3'

type Props = {
  className: string
  toast: {
    message: string
    status: 'success' | 'danger'
  }
  onClose: () => void
}

export const AcademicToast = ({ className, toast, onClose }: Props) => (
  <div className={className}>
    <Alert status={toast.status}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{toast.message}</Alert.Title>
      </Alert.Content>
      <CloseButton onClick={onClose} />
    </Alert>
  </div>
)
