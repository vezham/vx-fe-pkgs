import { ArrowUp, Microphone, Paperclip, Stop } from '@vezham/icons-react'
import { Button, Tooltip } from '@vezham/react-v3'

import type { ComposerProps } from './composer-types'
import { ComposerControls } from './controls'
import { FastModeToggle, ModelPicker } from './model-picker'
import { PermissionPicker } from './permission-picker'
import { TamizhiPluginSlot } from './plugins'
import type { useVoiceInput } from './use-voice-input'

type Props = Pick<
  ComposerProps,
  | 'api'
  | 'allowVoice'
  | 'isOffline'
  | 'isStreaming'
  | 'model'
  | 'models'
  | 'onModelChange'
  | 'isFastMode'
  | 'onFastModeChange'
  | 'permission'
  | 'onPermissionChange'
  | 'onStop'
> & {
  variant: 'app' | 'embed'
  voice: ReturnType<typeof useVoiceInput>
  canSend: boolean
  onAttach: () => void
}

export const ComposerToolbar = ({
  api,
  allowVoice,
  isOffline,
  isStreaming,
  model,
  models,
  onModelChange,
  isFastMode,
  onFastModeChange,
  permission,
  onPermissionChange,
  onStop,
  variant,
  voice,
  canSend,
  onAttach
}: Props) => (
  <div className="tamizhi-composer__toolbar">
    <div className="tamizhi-composer__toolbar-start">
      <TamizhiPluginSlot name="composer-actions" />
      <Tooltip>
        <Button
          aria-label="Attach files"
          type="button"
          isIconOnly
          size="sm"
          variant="ghost"
          className="tamizhi-composer__tool-button"
          isDisabled={isOffline}
          onPress={onAttach}>
          <Paperclip size={24} aria-hidden="true" />
        </Button>
        <Tooltip.Content>Attach files</Tooltip.Content>
      </Tooltip>
      {allowVoice && api && (
        <Tooltip>
          <Button
            type="button"
            isIconOnly
            size="sm"
            variant={voice.isRecording ? 'danger' : 'ghost'}
            aria-label={voice.isRecording ? 'Finish recording' : 'Voice input'}
            isDisabled={isOffline || isStreaming || voice.isTranscribing}
            onPress={() => void voice.toggle()}>
            <Microphone size={20} aria-hidden="true" />
          </Button>
          <Tooltip.Content>
            {voice.isRecording
              ? 'Finish recording'
              : voice.isTranscribing
                ? 'Transcribing'
                : 'Voice input'}
          </Tooltip.Content>
        </Tooltip>
      )}
      {variant === 'embed' ? (
        <ComposerControls
          isFastMode={isFastMode}
          onFastModeChange={onFastModeChange}
          permission={permission}
          onPermissionChange={onPermissionChange}
        />
      ) : (
        <>
          <FastModeToggle
            isFastMode={isFastMode}
            onFastModeChange={onFastModeChange}
          />
          <PermissionPicker
            permission={permission}
            onPermissionChange={onPermissionChange}
          />
        </>
      )}
    </div>
    <div className="tamizhi-composer__toolbar-end">
      <ModelPicker
        model={model}
        onModelChange={onModelChange}
        catalog={models}
      />
      {isStreaming ? (
        <Button
          aria-label="Stop response"
          isIconOnly
          variant="secondary"
          className="tamizhi-composer__send"
          onPress={onStop}>
          <Stop size={24} aria-hidden="true" />
        </Button>
      ) : (
        <Button
          aria-label="Send message"
          isIconOnly
          type="submit"
          className="tamizhi-composer__send"
          isDisabled={!canSend}>
          <ArrowUp size={24} aria-hidden="true" />
        </Button>
      )}
    </div>
  </div>
)
