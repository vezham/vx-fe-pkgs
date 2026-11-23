import type {
  ListDeviceSession,
  MultiSessionAuthClient
} from '@vezham/auth-ui-core/plugins/multi-session'
import { multiSessionPlugin } from '@vezham/auth-ui-core/plugins/multi-session'
import { useAuth, useAuthPlugin, useUser } from '@vezham/auth-ui-react'
import {
  useRevokeMultiSession,
  useSetActiveSession
} from '@vezham/auth-ui-react/plugins/multi-session'
import {
  TransferHorizontal as ArrowRightArrowLeft,
  Logout as ArrowRightFromSquare,
  MenuDots as Ellipsis
} from '@vezham/icons-react'
import { Button, Dropdown, Spinner, toast } from '@vezham/react-v3'

import { UserView } from '../../user/user-view'

export type ManageAccountProps = {
  deviceSession?: ListDeviceSession | null
  isPending?: boolean
}

/**
 * Render a single account row with user info and a dropdown for switch/sign-out actions.
 *
 * Shows the user's avatar and info. A three-dot menu provides options to
 * switch account (for non-active sessions) and sign out.
 *
 * @param deviceSession - The device session object containing session and user data
 * @returns A JSX element containing the account row
 */
export const ManageAccount = ({
  deviceSession,
  isPending
}: ManageAccountProps) => {
  const { authClient, localization } = useAuth<MultiSessionAuthClient>()
  const { localization: multiSessionLocalization } =
    useAuthPlugin(multiSessionPlugin)
  const { data: user } = useUser(authClient)

  const { mutate: setActiveSession, isPending: isSwitching } =
    useSetActiveSession(authClient, {
      onSuccess: () => window.scrollTo({ top: 0 })
    })

  const { mutate: revokeSession, isPending: isRevoking } =
    useRevokeMultiSession(authClient, {
      onSuccess: () => toast.success(localization.settings.revokeSessionSuccess)
    })

  const isActive = deviceSession?.session.userId === user?.id
  const isBusy = isSwitching || isRevoking

  return (
    <div className="flex items-center justify-between gap-3">
      <UserView user={deviceSession?.user} isPending={isPending} size="md" />

      {deviceSession && isActive && (
        <Button
          className="shrink-0"
          variant="outline"
          size="sm"
          onPress={() =>
            revokeSession({ sessionToken: deviceSession.session.token })
          }
          isDisabled={isBusy}>
          {isRevoking ? (
            <Spinner color="current" size="sm" />
          ) : (
            <ArrowRightFromSquare size={16} />
          )}
          {localization.auth.signOut}
        </Button>
      )}

      {deviceSession && !isActive && (
        <Dropdown>
          <Button
            isIconOnly
            aria-label={multiSessionLocalization.manageAccounts}
            variant="ghost"
            className="shrink-0"
            size="sm"
            isDisabled={isBusy}>
            <Ellipsis size={16} />
          </Button>

          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item
                textValue={multiSessionLocalization.switchAccount}
                onAction={() =>
                  setActiveSession({
                    sessionToken: deviceSession.session.token
                  })
                }>
                <ArrowRightArrowLeft size={16} className="text-muted" />
                {multiSessionLocalization.switchAccount}
              </Dropdown.Item>

              <Dropdown.Item
                textValue={localization.auth.signOut}
                onAction={() =>
                  revokeSession({
                    sessionToken: deviceSession.session.token
                  })
                }>
                <ArrowRightFromSquare size={16} className="text-muted" />
                {localization.auth.signOut}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      )}
    </div>
  )
}
