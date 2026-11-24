import { magicLinkPlugin } from '@vezham/auth-ui-core/plugins/magic-link'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { Card, type CardProps, Description, Link, cn } from '@vezham/react-v3'

import { useSessionStorageValue } from '../../lib/use-session-storage-value'
import { OpenEmailButton } from '../../open-email-button'

/** `sessionStorage` key the magic-link form stores the submitted email under. */
export const MAGIC_LINK_SENT_STORAGE_KEY = 'vezham.auth.magic-link-sent'

export type MagicLinkSentProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Render a card confirming that a magic-link email was sent, with a button
 * to open the user's email provider.
 *
 * The target email is read from `sessionStorage` (set when the magic-link
 * form redirects here); the OpenEmail button is only shown when an email is
 * stored and resolves to a known provider.
 *
 * @param className - Additional CSS classes applied to the outer card container
 * @param variant - Variant to apply to the card
 * @returns The magic-link-sent card React element
 */
export const MagicLinkSent = ({ className, variant }: MagicLinkSentProps) => {
  const { basePaths, emailAndPassword, localization, viewPaths } = useAuth()
  const { localization: magicLinkLocalization } = useAuthPlugin(magicLinkPlugin)

  const email = useSessionStorageValue(MAGIC_LINK_SENT_STORAGE_KEY)

  return (
    <Card
      className={cn('w-full max-w-sm gap-4 md:p-6', className)}
      variant={variant}>
      <Card.Header>
        <Card.Title className="mb-1 text-xl font-semibold">
          {localization.auth.checkYourEmailTitle}
        </Card.Title>
      </Card.Header>

      <Card.Content className="gap-4">
        <Description className="text-sm">
          {email
            ? magicLinkLocalization.magicLinkSentTo.replace('{{email}}', email)
            : magicLinkLocalization.magicLinkSent}
        </Description>

        {email && <OpenEmailButton email={email} />}
      </Card.Content>

      {emailAndPassword?.enabled && (
        <Card.Footer className="flex-col gap-3">
          <Description className="text-sm">
            {localization.auth.needToCreateAnAccount}{' '}
            <Link
              href={`${basePaths.auth}/${viewPaths.auth.signUp}`}
              className="text-accent decoration-accent-hover no-underline hover:underline">
              {localization.auth.signUp}
            </Link>
          </Description>
        </Card.Footer>
      )}
    </Card>
  )
}
