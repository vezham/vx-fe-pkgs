import { Button } from '@vezham/react-v3'

type Props = {
  isFormMode: boolean
  isCreateMode?: boolean
  formActionsClassName: string
  viewActionsClassName: string
  flexOneClassName: string
  onCancel: () => void
  onClose: () => void
  onEdit: () => void
  onSave: () => void
}

export const RecordDrawerFooter = ({
  isFormMode,
  isCreateMode,
  formActionsClassName,
  viewActionsClassName,
  flexOneClassName,
  onCancel,
  onClose,
  onEdit,
  onSave
}: Props) =>
  isFormMode ? (
    <div className={formActionsClassName}>
      <Button variant="secondary" onPress={onCancel}>
        Cancel
      </Button>
      <Button onPress={onSave}>{isCreateMode ? 'Create' : 'Save'}</Button>
    </div>
  ) : (
    <div className={viewActionsClassName}>
      <Button
        className={flexOneClassName}
        variant="secondary"
        onPress={onClose}>
        Close
      </Button>
      <Button className={flexOneClassName} onPress={onEdit}>
        Edit
      </Button>
    </div>
  )
