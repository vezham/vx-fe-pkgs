import { useState } from 'react'

import { formatLocaleDate } from '@vezham/auth-ui-core'
import type { ListedApiKey } from '@vezham/auth-ui-core/plugins/api-key'
import { apiKeyPlugin } from '@vezham/auth-ui-core/plugins/api-key'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { Key, Close as Xmark } from '@vezham/icons-react'
import { Button } from '@vezham/react-v3'

import { DeleteApiKeyDialog } from './delete-api-key-dialog'
import { EditApiKeyDialog } from './edit-api-key-dialog'

export type ApiKeyProps = {
  apiKey: ListedApiKey
  /** Hide the row's delete button (e.g., when caller lacks `apiKey:delete`). */
  hideDelete?: boolean
  /** Hide the row's edit button (e.g., when caller lacks `apiKey:update`). */
  hideUpdate?: boolean
  /** Scope the delete payload to an organization (sets `configId`). */
  organizationId?: string
}

export const ApiKey = ({
  apiKey,
  hideDelete,
  hideUpdate,
  organizationId
}: ApiKeyProps) => {
  const { locale, localization } = useAuth()
  const { localization: apiKeyLocalization } = useAuthPlugin(apiKeyPlugin)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const preview = `${apiKey.start}${'*'.repeat(16)}`

  return (
    <div className="flex items-center gap-3">
      <div className="bg-surface-secondary flex size-10 shrink-0 items-center justify-center rounded-xl">
        <Key size={16} className="size-4.5" />
      </div>

      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm leading-tight font-medium">
          {apiKey.name || apiKeyLocalization.apiKey}
        </span>

        <span className="text-muted truncate font-mono text-xs">{preview}</span>

        <span className="text-muted text-xs">
          {apiKeyLocalization.created}{' '}
          {formatLocaleDate(apiKey.createdAt, locale.languageTag, {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </span>

        <span className="text-muted text-xs">
          {apiKey.expiresAt
            ? `${apiKeyLocalization.expires} ${formatLocaleDate(
                apiKey.expiresAt,
                locale.languageTag,
                {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                }
              )}`
            : apiKeyLocalization.neverExpires}
        </span>
        <span className="text-muted text-xs">
          {apiKey.enabled
            ? apiKeyLocalization.enabled
            : apiKeyLocalization.disabled}
          {` · ${apiKeyLocalization.requests}: ${apiKey.requestCount}`}
          {apiKey.remaining === null
            ? ''
            : ` · ${apiKeyLocalization.remaining}: ${apiKey.remaining}`}
        </span>
        <span className="text-muted text-xs">
          {apiKeyLocalization.lastRequest}:{' '}
          {apiKey.lastRequest
            ? formatLocaleDate(apiKey.lastRequest, locale.languageTag)
            : apiKeyLocalization.neverRequested}
        </span>
      </div>

      {!hideUpdate && (
        <>
          <Button
            className="ml-auto shrink-0"
            variant="outline"
            size="sm"
            onPress={() => setEditOpen(true)}>
            {apiKeyLocalization.editApiKey}
          </Button>
          <EditApiKeyDialog
            apiKey={apiKey}
            isOpen={editOpen}
            onOpenChange={setEditOpen}
          />
        </>
      )}

      {!hideDelete && (
        <>
          <Button
            className={hideUpdate ? 'ml-auto shrink-0' : 'shrink-0'}
            variant="outline"
            size="sm"
            onPress={() => setDeleteOpen(true)}
            aria-label={apiKeyLocalization.deleteApiKey}>
            <Xmark size={16} />

            {localization.settings.delete}
          </Button>

          <DeleteApiKeyDialog
            isOpen={deleteOpen}
            onOpenChange={setDeleteOpen}
            apiKey={apiKey}
            organizationId={organizationId}
          />
        </>
      )}
    </div>
  )
}
