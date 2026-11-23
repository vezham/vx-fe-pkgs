import { apiKeyPlugin } from '@vezham/auth-ui-core/plugins/api-key'
import { useAuthPlugin } from '@vezham/auth-ui-react'
import { Key } from '@vezham/icons-react'
import { Button } from '@vezham/react-v3'

export type ApiKeysEmptyProps = {
  onCreatePress: () => void
  /** Hide the empty-state "Create API key" button. */
  hideCreate?: boolean
}

export const ApiKeysEmpty = ({
  onCreatePress,
  hideCreate
}: ApiKeysEmptyProps) => {
  const { localization: apiKeyLocalization } = useAuthPlugin(apiKeyPlugin)

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="bg-surface-secondary flex size-10 items-center justify-center rounded-xl">
        <Key size={16} className="size-4.5" />
      </div>

      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <p className="text-sm font-semibold">{apiKeyLocalization.noApiKeys}</p>

        <p className="text-muted text-xs">
          {apiKeyLocalization.apiKeysDescription}
        </p>
      </div>

      {!hideCreate && (
        <Button size="sm" onPress={onCreatePress}>
          {apiKeyLocalization.createApiKey}
        </Button>
      )}
    </div>
  )
}
