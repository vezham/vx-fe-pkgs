import { Chip } from '@vezham/react-v3'

type Props = {
  status: string
}

export const AcademicStatusChip = ({ status }: Props) => (
  <Chip
    color={status === 'Active' ? 'success' : 'danger'}
    size="sm"
    variant="soft">
    <span aria-hidden="true">●</span>
    <Chip.Label>{status}</Chip.Label>
  </Chip>
)
