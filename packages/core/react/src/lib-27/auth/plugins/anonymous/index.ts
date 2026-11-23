'use client'

import { AnonymousButton } from './anonymous-button'
import { anonymousPlugin } from './plugin'

export type * from './anonymous-button'
export type * from './plugin'

export const Anonymous = Object.assign(AnonymousButton, {
  plugin: anonymousPlugin
})
