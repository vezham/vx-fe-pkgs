import { apiKeyPlugin } from '@vezham/auth-ui-core/plugins/api-key'
import {
  useAuth,
  useAuthPlugin,
  useCopyToClipboard
} from '@vezham/auth-ui-react'
import { CheckRead as Check, Copy, Key } from '@vezham/icons-react'
import {
  Button,
  InputGroup,
  Label,
  Modal,
  TextField,
  toast
} from '@vezham/react-v3'

export type NewApiKeyDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  name: string | null
  secretKey: string | null
}

export const NewApiKeyDialog = ({
  isOpen,
  onOpenChange,
  name,
  secretKey
}: NewApiKeyDialogProps) => {
  const { localization } = useAuth()
  const { localization: apiKeyLocalization } = useAuthPlugin(apiKeyPlugin)

  const { copied, copy, reset } = useCopyToClipboard({
    onError: error => {
      console.error('[Vezham Auth] Copy failed', error)
      toast.danger(localization.errors.copyFailed)
    }
  })

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset()
    }

    onOpenChange(open)
  }

  const copySecretKey = async () => {
    if (!secretKey) return

    await copy(secretKey)
  }

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Modal.Container>
        <Modal.Dialog>
          <Modal.CloseTrigger />

          <Modal.Header>
            <Modal.Icon className="bg-warning-soft text-warning-soft-foreground">
              <Key size={16} />
            </Modal.Icon>

            <Modal.Heading>{apiKeyLocalization.newApiKey}</Modal.Heading>
          </Modal.Header>

          <Modal.Body className="flex flex-col gap-4 overflow-visible">
            <p className="text-muted text-sm">
              {apiKeyLocalization.newApiKeyWarning}
            </p>

            <TextField value={secretKey ?? ''} className="font-mono text-xs">
              <Label>{name || apiKeyLocalization.apiKey}</Label>

              <InputGroup variant="secondary">
                <InputGroup.Input readOnly className="font-mono text-xs" />

                <InputGroup.Suffix className="px-0">
                  <Button
                    isIconOnly
                    aria-label={
                      copied
                        ? localization.settings.copiedToClipboard
                        : localization.settings.copyToClipboard
                    }
                    size="sm"
                    variant="ghost"
                    onPress={() => void copySecretKey()}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
          </Modal.Body>

          <Modal.Footer>
            <Button onPress={() => handleOpenChange(false)}>
              {apiKeyLocalization.dismissNewKey}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
