import {
  downloadTextFile,
  formatBackupCodesText,
  printTextFile
} from '@vezham/auth-ui-core'
import { twoFactorPlugin } from '@vezham/auth-ui-core/plugins/two-factor'
import {
  useAuth,
  useAuthPlugin,
  useCopyToClipboard
} from '@vezham/auth-ui-react'
import {
  Download as ArrowDownToLine,
  CheckRead as Check,
  Copy,
  Printer
} from '@vezham/icons-react'
import { Button, toast } from '@vezham/react-v3'

export type BackupCodesProps = {
  codes: string[]
}

/**
 * One-time display of freshly generated backup codes.
 *
 * The codes are never persisted anywhere on the client. They live in the
 * calling component's state until the dialog closes, so the save actions
 * matter.
 *
 * @param codes - Backup codes returned by enable or regenerate.
 */
export const BackupCodes = ({ codes }: BackupCodesProps) => {
  const { localization } = useAuth()
  const { localization: twoFactorLocalization } = useAuthPlugin(twoFactorPlugin)
  const { copied, copy } = useCopyToClipboard({
    onError: () => toast.danger(twoFactorLocalization.backupCodesCopyFailed)
  })
  const getBackupCodesText = () =>
    formatBackupCodesText(codes, twoFactorLocalization, window.location.origin)

  const copyCodes = () => copy(getBackupCodesText())

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted text-sm">
        {twoFactorLocalization.backupCodesDescription}
      </p>

      <ul className="border-border bg-surface-secondary grid grid-cols-2 gap-2 rounded-lg border p-4 font-mono text-sm">
        {codes.map(backupCode => (
          <li className="tracking-wide" key={backupCode}>
            {backupCode}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        <Button
          aria-label={
            copied
              ? twoFactorLocalization.backupCodesCopied
              : localization.settings.copyToClipboard
          }
          size="sm"
          variant="tertiary"
          onPress={() => void copyCodes()}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {localization.settings.copyToClipboard}
        </Button>

        <Button
          size="sm"
          variant="tertiary"
          onPress={() =>
            downloadTextFile(getBackupCodesText(), 'backup-codes.txt')
          }>
          <ArrowDownToLine size={16} />
          {twoFactorLocalization.downloadBackupCodes}
        </Button>

        <Button
          size="sm"
          variant="tertiary"
          onPress={() => printTextFile(getBackupCodesText())}>
          <Printer size={16} />
          {twoFactorLocalization.printBackupCodes}
        </Button>
      </div>
    </div>
  )
}
