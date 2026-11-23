import { useState } from 'react'

import type { PasskeyAuthClient } from '@vezham/auth-ui-core/plugins/passkey'
import { passkeyPlugin } from '@vezham/auth-ui-core/plugins/passkey'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useListPasskeys } from '@vezham/auth-ui-react/plugins/passkey'
import { Button, Card, type CardProps, cn } from '@vezham/react-v3'

import { AddPasskeyDialog } from './add-passkey-dialog'
import { Passkey } from './passkey'
import { PasskeySkeleton } from './passkey-skeleton'
import { PasskeysEmpty } from './passkeys-empty'

export type PasskeysProps = {
  className?: string
  variant?: CardProps['variant']
}

export const Passkeys = ({
  className,
  variant,
  ...props
}: PasskeysProps & Omit<CardProps, 'children'>) => {
  const { authClient } = useAuth<PasskeyAuthClient>()
  const { localization: passkeyLocalization } = useAuthPlugin(passkeyPlugin)

  const { data: passkeys, isPending } = useListPasskeys(authClient)

  const [addOpen, setAddOpen] = useState(false)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-end justify-between gap-3">
        <h2 className="truncate text-sm font-semibold">
          {passkeyLocalization.passkeys}
        </h2>

        <Button
          className="shrink-0"
          size="sm"
          isDisabled={isPending}
          onPress={() => setAddOpen(true)}>
          {passkeyLocalization.addPasskey}
        </Button>
      </div>

      <Card variant={variant} {...props}>
        <Card.Content>
          {isPending ? (
            <PasskeySkeleton />
          ) : !passkeys?.length ? (
            <PasskeysEmpty onAddPress={() => setAddOpen(true)} />
          ) : (
            passkeys.map((passkey, index) => (
              <div key={passkey.id}>
                {index > 0 && (
                  <div className="-mx-4 my-4 border-b border-dashed" />
                )}

                <Passkey passkey={passkey} />
              </div>
            ))
          )}
        </Card.Content>
      </Card>

      <AddPasskeyDialog isOpen={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
