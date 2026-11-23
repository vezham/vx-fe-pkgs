'use client'

import { createContext } from 'react'

import type { AuthConfig } from '@vezham/auth-ui-core'

/** Split from `auth-provider` so HMR reloading that file does not replace this context instance. */
export const AuthContext = createContext<AuthConfig | undefined>(undefined)
