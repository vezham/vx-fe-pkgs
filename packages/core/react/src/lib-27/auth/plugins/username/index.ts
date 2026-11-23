'use client'

import { usernamePlugin } from './plugin'
import { SignInUsername } from './sign-in-username'
import { UsernameField } from './username-field'

export type * from './sign-in-username'
export type * from './plugin'
export type * from './username-field'

export const Username = Object.assign(SignInUsername, {
  plugin: usernamePlugin,
  Field: UsernameField
})
