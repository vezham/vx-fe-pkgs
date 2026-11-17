import type { Chip } from '@vezham/react-v3'

type ChannelStyle = Pick<Chip['Props'], 'color' | 'variant'>

export const brandConfig: {
  defaultChannel: ChannelStyle
  channels: (ChannelStyle & { id: string; label: string })[]
} = {
  defaultChannel: { color: 'warning', variant: 'soft' },
  channels: [
    { id: 'intra', label: 'Internal', color: 'danger', variant: 'primary' },
    { id: 'oss', label: 'OSS', color: 'success', variant: 'soft' }
  ]
}
