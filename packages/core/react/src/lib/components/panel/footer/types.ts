import type { ReactElement, ReactNode } from 'react'

export interface UserInfo {
  id: string
  name: string
  avatar?: string
  isOnline?: boolean
}

export type UserStatus = 'active' | 'away' | 'idle' | 'busy' | 'dnd'

export interface UserStatusOption {
  id: UserStatus
  label: string
  icon: string
  color?: string
}

export interface SuggestedStatusOption {
  id: string
  label: string
  emoji: string
}

export interface StatusTimingOption {
  id: string
  label: string
}

export interface FooterActionsProps {
  user: UserInfo

  showAI?: boolean
  showControlCenter?: boolean
  controlCenter?: ReactElement
  showNotifications?: boolean
  showUserInfo?: boolean
  hideSeparator?: boolean

  notificationCount?: number

  onTamizhi?: () => void
  onNotificationsClick?: () => void

  toolbarAction?: ReactNode
  className?: string
}
