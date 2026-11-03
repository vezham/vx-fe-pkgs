import type { ReactNode, RefObject } from 'react'

import type { TamizhiAPIClient } from '@vezham/tamizhi-client'
import type { APIAttachment, ModelInfo } from '@vezham/tamizhi-contracts'

export interface ComposerProps {
  api?: TamizhiAPIClient
  allowImages?: boolean
  allowPDF?: boolean
  allowVoice?: boolean
  isStreaming: boolean
  isReady: boolean
  isOffline: boolean
  model: string
  models?: ModelInfo[]
  onModelChange: (model: string) => void
  isFastMode: boolean
  onFastModeChange: (isFastMode: boolean) => void
  permission: string
  onPermissionChange: (permission: string) => void
  note?: ReactNode
  avatarSlotRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLTextAreaElement | null>
  onListeningChange: (isListening: boolean) => void
  onSend: (prompt: string, attachments?: APIAttachment[]) => void
  onStop: () => void
}

export interface ComposerFile {
  id: string
  file: File
}
