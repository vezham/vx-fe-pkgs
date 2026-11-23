import type { Account } from '@vezham/auth'
import {
  type AuthSocialProvider,
  getAuthCallbackURL,
  getAuthErrorMessage,
  getProviderId,
  getProviderName,
  isReauthenticationRequiredError
} from '@vezham/auth-ui-core'
import {
  renderProviderIcon,
  useAccountInfo,
  useAuth,
  useLinkSocial,
  useUnlinkAccount
} from '@vezham/auth-ui-react'
import {
  Link,
  LinkMinimalistic as LinkSlash,
  PlugCircle as PlugConnection
} from '@vezham/icons-react'
import {
  AlertDialog,
  Button,
  Skeleton,
  Spinner,
  cn,
  toast
} from '@vezham/react-v3'

import { ReauthenticationAction } from '../../reauthentication'

export type LinkedAccountProps = {
  account?: Account
  canUnlink?: boolean
  provider: AuthSocialProvider | (string & {})
}

/**
 * Render a single linked social account row with provider info and link/unlink control.
 *
 * Fetches additional account information from the provider using the accountInfo API
 * and displays the provider name, account details, and a link/unlink button.
 *
 * @param account - The account object containing id, accountId, and providerId
 * @param provider - The provider id
 * @returns A JSX element containing the linked account row
 */
const readAccountString = (data: unknown, key: 'login' | 'username') => {
  if (typeof data !== 'object' || data === null || !(key in data))
    return undefined
  const value: unknown = Reflect.get(data, key)
  return typeof value === 'string' ? value : undefined
}

export const LinkedAccount = ({
  account,
  canUnlink = true,
  provider
}: LinkedAccountProps) => {
  const { authClient, baseURL, localization } = useAuth()

  const { data: accountInfo, isPending: isLoadingInfo } = useAccountInfo(
    authClient,
    {
      query: { accountId: account?.id ?? '' }
    }
  )

  const { mutate: linkSocial, isPending: isLinking } = useLinkSocial(authClient)

  const unlinkAccount = useUnlinkAccount(authClient, {
    meta: { errorPresentation: 'inline' },
    onError: error => {
      if (!isReauthenticationRequiredError(error)) {
        const message = getAuthErrorMessage(error, localization)
        if (message) {
          console.error('[Vezham Auth]', error)
          toast.danger(message)
        }
      }
    },
    onSuccess: () => toast.success(localization.settings.accountUnlinked)
  })

  const providerId = getProviderId(provider)
  const providerIcon = renderProviderIcon(provider, {
    className: 'size-4.5'
  })
  const providerName = getProviderName(provider)
  const accountData = accountInfo?.data
  const accountLogin = readAccountString(accountData, 'login')
  const accountUsername = readAccountString(accountData, 'username')

  const displayName =
    accountLogin ||
    accountUsername ||
    accountInfo?.user?.email ||
    accountInfo?.user?.name ||
    account?.accountId
  const needsReauthentication = isReauthenticationRequiredError(
    unlinkAccount.error
  )

  return (
    <>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'bg-surface-secondary flex size-10 shrink-0 items-center justify-center rounded-xl',
            !account && 'opacity-50'
          )}>
          {providerIcon ? (
            providerIcon
          ) : (
            <PlugConnection size={16} className="size-4.5" />
          )}
        </div>

        <div className="flex min-w-0 flex-col">
          <span className="text-sm leading-tight font-medium">
            {providerName}
          </span>

          {account && isLoadingInfo ? (
            <Skeleton className="my-0.5 h-3 w-24 rounded-lg" />
          ) : (
            <span className="text-muted truncate text-xs">
              {account
                ? displayName
                : localization.settings.linkProvider.replace(
                    '{{provider}}',
                    providerName
                  )}
            </span>
          )}
        </div>

        {account ? (
          <span
            className="ml-auto shrink-0"
            title={
              canUnlink
                ? undefined
                : localization.settings.lastAccountUnlinkingDisabled
            }>
            <Button
              variant="outline"
              size="sm"
              onPress={() => unlinkAccount.mutate({ accountId: account.id })}
              isPending={unlinkAccount.isPending}
              isDisabled={!canUnlink}
              aria-label={localization.settings.unlinkProvider.replace(
                '{{provider}}',
                providerName
              )}>
              {unlinkAccount.isPending ? (
                <Spinner color="current" size="sm" />
              ) : (
                <LinkSlash size={16} />
              )}
              {localization.settings.unlinkProvider
                .replace('{{provider}}', '')
                .trim()}
            </Button>
          </span>
        ) : (
          <Button
            className="ml-auto shrink-0"
            variant="outline"
            size="sm"
            onPress={() =>
              linkSocial({
                provider: providerId,
                callbackURL: getAuthCallbackURL(
                  baseURL,
                  window.location.pathname
                )
              })
            }
            isPending={isLinking}
            aria-label={localization.settings.linkProvider.replace(
              '{{provider}}',
              providerName
            )}>
            {isLinking ? (
              <Spinner color="current" size="sm" />
            ) : (
              <Link size={16} />
            )}
            {localization.settings.link}
          </Button>
        )}
      </div>
      {account && (
        <AlertDialog.Backdrop
          isOpen={needsReauthentication}
          onOpenChange={nextOpen => {
            if (!nextOpen) unlinkAccount.reset()
          }}>
          <AlertDialog.Container>
            <AlertDialog.Dialog>
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Heading className="sr-only">
                  {localization.settings.reauthenticationTitle}
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <ReauthenticationAction showTitle={false} />
              </AlertDialog.Body>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      )}
    </>
  )
}
