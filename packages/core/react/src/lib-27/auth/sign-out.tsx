import { useEffect, useRef } from 'react'

import { useAuth, useSignOut } from '@vezham/auth-ui-react'
import { Spinner, cn } from '@vezham/react-v3'

export type SignOutProps = {
  className?: string
}

/**
 * Initiates sign-out on mount and renders a loading card while sign-out proceeds.
 *
 * @returns A Card containing a centered Spinner shown during the sign-out process
 */
export const SignOut = ({ className }: SignOutProps) => {
  const { authClient, basePaths, navigate, viewPaths } = useAuth()

  const { mutate: signOut } = useSignOut(authClient, {
    onError: () => {
      navigate({
        to: `${basePaths.auth}/${viewPaths.auth.signIn}`,
        replace: true
      })
    },
    onSuccess: () =>
      navigate({
        to: `${basePaths.auth}/${viewPaths.auth.signIn}`,
        replace: true
      })
  })

  const hasSignedOut = useRef(false)

  useEffect(() => {
    if (hasSignedOut.current) return
    hasSignedOut.current = true

    signOut()
  }, [signOut])

  return (
    <Spinner className={cn('mx-auto my-auto', className)} color="current" />
  )
}
