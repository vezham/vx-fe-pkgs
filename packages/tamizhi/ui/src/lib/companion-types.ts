import type { RefObject } from 'react'

import type { Outfit, Persona } from '@vezham/tamizhi-contracts'

import type { Expression } from './avatar-data'

export interface CompanionOptions {
  persona?: Persona
  outfit?: Outfit
  expression?: Expression
  palette?: string
  isListening?: boolean
  isThinking?: boolean
  isAnimated?: boolean
  isOffline?: boolean
  focusTargetRef?: RefObject<HTMLElement | null> | null
  size?: 'small' | 'large'
  previewSize?: 28 | 44 | 72
  asImage?: boolean
}
