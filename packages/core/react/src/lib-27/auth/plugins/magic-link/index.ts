'use client'

import { MagicLink as MagicLinkRoot } from './magic-link'
import { MagicLinkButton } from './magic-link-button'
import { MagicLinkSent } from './magic-link-sent'
import { magicLinkPlugin } from './plugin'

export type * from './magic-link'
export type * from './plugin'
export type * from './magic-link-button'
export type * from './magic-link-sent'

export const MagicLink = Object.assign(MagicLinkRoot, {
  plugin: magicLinkPlugin,
  Button: MagicLinkButton,
  Sent: MagicLinkSent
})
