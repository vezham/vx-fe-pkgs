import { useState } from 'react'

import { twoFactorPlugin } from '@vezham/auth-ui-core/plugins/two-factor'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import { ShieldCheck } from '@vezham/icons-react'
import { Button, Card, type CardProps, Skeleton, cn } from '@vezham/react-v3'

import { DisableTwoFactorDialog } from './disable-two-factor-dialog'
import { EnableTwoFactorDialog } from './enable-two-factor-dialog'
import { RegenerateBackupCodesDialog } from './regenerate-backup-codes-dialog'

export type TwoFactorSettingsProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Security-settings card for enrolling in and managing two-factor auth.
 *
 * Reads `user.twoFactorEnabled` from the session — the field the Better Auth
 * two-factor plugin adds — so the card reflects enrollment without an extra
 * request.
 *
 * @param className - Additional CSS classes applied to the card.
 * @param variant - Card variant.
 */
export const TwoFactorSettings = ({
  className,
  variant,
  ...props
}: TwoFactorSettingsProps & Omit<CardProps, 'children'>) => {
  const { authClient } = useAuth()
  const {
    backupCodes: backupCodesEnabled,
    localization: twoFactorLocalization
  } = useAuthPlugin(twoFactorPlugin)

  const { data: session, isPending } = useSession(authClient)
  const user = session?.user
  const isEnabled = Boolean(
    user && 'twoFactorEnabled' in user && user.twoFactorEnabled
  )

  const [enableOpen, setEnableOpen] = useState(false)
  const [disableOpen, setDisableOpen] = useState(false)
  const [regenerateOpen, setRegenerateOpen] = useState(false)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-end justify-between gap-3">
        <h2 className="truncate text-sm font-semibold">
          {twoFactorLocalization.twoFactor}
        </h2>

        <Button
          className="shrink-0"
          size="sm"
          variant={isEnabled ? 'danger' : 'primary'}
          isDisabled={isPending}
          onPress={() =>
            isEnabled ? setDisableOpen(true) : setEnableOpen(true)
          }>
          {isEnabled
            ? twoFactorLocalization.disableTwoFactor
            : twoFactorLocalization.enableTwoFactor}
        </Button>
      </div>

      <Card variant={variant} {...props}>
        <Card.Content className="gap-4">
          {!isPending && !isEnabled ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="bg-surface-secondary flex size-10 items-center justify-center rounded-xl">
                <ShieldCheck size={16} className="size-4.5" />
              </div>

              <div className="flex flex-col items-center justify-center gap-1 text-center">
                <p className="text-sm font-semibold">
                  {twoFactorLocalization.twoFactorDisabled}
                </p>

                <p className="text-muted text-xs">
                  {twoFactorLocalization.twoFactorDescription}
                </p>
              </div>

              <Button size="sm" onPress={() => setEnableOpen(true)}>
                {twoFactorLocalization.enableTwoFactor}
              </Button>
            </div>
          ) : (
            <>
              {isPending ? (
                <Skeleton className="h-5 w-48 rounded-lg" />
              ) : (
                <p className="text-sm font-medium">
                  {twoFactorLocalization.twoFactorEnabled}
                </p>
              )}

              <p className="text-muted text-sm">
                {twoFactorLocalization.twoFactorDescription}
              </p>

              {isEnabled && backupCodesEnabled && (
                <Button
                  className="self-start"
                  size="sm"
                  variant="tertiary"
                  onPress={() => setRegenerateOpen(true)}>
                  {twoFactorLocalization.regenerateBackupCodes}
                </Button>
              )}
            </>
          )}
        </Card.Content>
      </Card>

      <EnableTwoFactorDialog isOpen={enableOpen} onOpenChange={setEnableOpen} />
      <DisableTwoFactorDialog
        isOpen={disableOpen}
        onOpenChange={setDisableOpen}
      />
      <RegenerateBackupCodesDialog
        isOpen={regenerateOpen}
        onOpenChange={setRegenerateOpen}
      />
    </div>
  )
}
