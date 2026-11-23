'use client'

import type { ReactNode } from 'react'

import type { AuthView } from '@vezham/auth-ui-core'

import type { AuthPlugin } from '../../lib/auth-plugin'
import { useAuth } from './auth-provider'

export type AuthPromptsProps = {
  view: AuthView
}

/**
 * Mount every headless prompt contributed by the registered UI plugins.
 *
 * Prompt descriptors carry their own stable ids so their component state is
 * preserved without relying on array positions.
 */
export const AuthPrompts = ({ view }: AuthPromptsProps): ReactNode => {
  const { plugins } = useAuth()

  return (plugins as AuthPlugin[]).flatMap(plugin =>
    (plugin.authPrompts ?? []).map(({ component: AuthPrompt, id }) => (
      <AuthPrompt key={`${plugin.id}-${id}`} view={view} />
    ))
  )
}
