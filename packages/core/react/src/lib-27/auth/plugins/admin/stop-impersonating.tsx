import {
  type AdminAuthClient,
  adminPlugin,
  isImpersonatingSession
} from '@vezham/auth-ui-core/plugins/admin'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import { useStopImpersonating } from '@vezham/auth-ui-react/plugins/admin'
import { Refresh as ArrowRotateLeft } from '@vezham/icons-react'
import { Dropdown, Label, Spinner } from '@vezham/react-v3'

export type StopImpersonatingProps = {
  className?: string
}

/**
 * Restore the administrator's session when the current session is
 * impersonating another user.
 */
export const StopImpersonating = ({ className }: StopImpersonatingProps) => {
  const { authClient } = useAuth<AdminAuthClient>()
  const { localization } = useAuthPlugin(adminPlugin)
  const { data: session } = useSession(authClient)
  const stopImpersonating = useStopImpersonating(authClient)

  if (!isImpersonatingSession(session)) {
    return null
  }

  return (
    <Dropdown.Item
      className={className}
      isDisabled={stopImpersonating.isPending}
      onPress={() => stopImpersonating.mutate(undefined)}
      textValue={localization.stopImpersonating}>
      {stopImpersonating.isPending ? (
        <Spinner color="current" size="sm" />
      ) : (
        <ArrowRotateLeft size={16} className="text-muted" />
      )}

      <Label>{localization.stopImpersonating}</Label>
    </Dropdown.Item>
  )
}
