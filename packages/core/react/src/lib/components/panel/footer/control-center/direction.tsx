import { AlignLeft, AlignRight } from '@vezham/icons-react'

import { useRootAttribute } from './document'
import { Options } from './options'
import { ActionTile } from './tile'

const options = [
  { value: 'ltr', label: 'LTR' },
  { value: 'rtl', label: 'RTL' }
] as const

export const DirectionTile = ({
  onOpen,
  label = 'Direction'
}: {
  label?: string
  onOpen: () => void
}) => {
  const { value } = useRootAttribute('dir', 'ltr')
  const Icon = value === 'rtl' ? AlignRight : AlignLeft
  return (
    <ActionTile
      label={label}
      description={value.toUpperCase()}
      icon={<Icon size={18} />}
      onPress={onOpen}
    />
  )
}

export const DirectionSettings = () => {
  const direction = useRootAttribute('dir', 'ltr')
  return <Options {...direction} options={options} />
}

export const DirectionToggle = ({
  label,
  compact = true
}: {
  label?: string
  compact?: boolean
}) => {
  const { value, onChange } = useRootAttribute('dir', 'ltr')
  const Icon = value === 'rtl' ? AlignRight : AlignLeft
  return (
    <ActionTile
      label={
        label ??
        (compact ? `Switch to ${value === 'rtl' ? 'LTR' : 'RTL'}` : 'Direction')
      }
      description={compact ? undefined : value.toUpperCase()}
      compact={compact}
      icon={<Icon size={20} />}
      onPress={() => onChange(value === 'rtl' ? 'ltr' : 'rtl')}
    />
  )
}
