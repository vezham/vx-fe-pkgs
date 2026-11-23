import { passkeyPlugin } from '@vezham/auth-ui-core/plugins/passkey'
import { useAuthPlugin } from '@vezham/auth-ui-react'
import { Scanner as Fingerprint } from '@vezham/icons-react'
import { Button } from '@vezham/react-v3'

export type PasskeysEmptyProps = {
  onAddPress: () => void
}

export const PasskeysEmpty = ({ onAddPress }: PasskeysEmptyProps) => {
  const { localization: passkeyLocalization } = useAuthPlugin(passkeyPlugin)

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="bg-surface-secondary flex size-10 items-center justify-center rounded-xl">
        <Fingerprint size={16} className="size-4.5" />
      </div>

      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <p className="text-sm font-semibold">
          {passkeyLocalization.noPasskeys}
        </p>

        <p className="text-muted text-xs">
          {passkeyLocalization.passkeysDescription}
        </p>
      </div>

      <Button size="sm" onPress={onAddPress}>
        {passkeyLocalization.addPasskey}
      </Button>
    </div>
  )
}
