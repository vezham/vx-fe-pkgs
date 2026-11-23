import type { AuthClient } from '@vezham/auth-ui-core'
import {
  AuthProvider as AuthProviderPrimitive,
  type AuthProviderProps as AuthProviderPropsPrimitive
} from '@vezham/auth-ui-react'
import { RouterProvider } from '@vezham/react-v3'

import { ErrorToaster } from './error-toaster'

export type AuthProviderProps<TAuthClient extends AuthClient = AuthClient> =
  AuthProviderPropsPrimitive<TAuthClient>

/**
 * Vezham-flavored `AuthProvider`. Wraps the primitive provider with a
 * heroui `RouterProvider` and the heroui `ErrorToaster`.
 */
export const AuthProvider = <TAuthClient extends AuthClient = AuthClient>({
  children,
  navigate,
  ...config
}: AuthProviderProps<TAuthClient>) => {
  return (
    <AuthProviderPrimitive navigate={navigate} {...config}>
      <RouterProvider navigate={path => navigate({ to: path })}>
        {children}

        <ErrorToaster />
      </RouterProvider>
    </AuthProviderPrimitive>
  )
}
