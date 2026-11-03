import { CloseCircle } from '@vezham/icons-react'
import { Button, Form, Label, TextArea, TextField } from '@vezham/react-v3'

import { ComposerToolbar } from './composer-toolbar'
import type { ComposerProps } from './composer-types'
import { createId } from './create-id'
import { useComposerInput } from './use-composer-input'

interface Props extends ComposerProps {
  variant: 'app' | 'embed'
}

export const ComposerLayout = ({
  variant,
  api,
  allowImages,
  allowPDF,
  allowVoice,
  isStreaming,
  isReady,
  isOffline,
  model,
  models,
  onModelChange,
  isFastMode,
  onFastModeChange,
  permission,
  onPermissionChange,
  note,
  avatarSlotRef,
  inputRef,
  onListeningChange,
  onSend,
  onStop
}: Props) => {
  const {
    text,
    setText,
    voice,
    files,
    setFiles,
    fileError,
    isReadingFiles,
    fileInput,
    signalListening,
    stopListening,
    send
  } = useComposerInput({
    api,
    isStreaming,
    isReady,
    isOffline,
    inputRef,
    onListeningChange,
    onSend
  })
  return (
    <div className={`tamizhi-composer tamizhi-composer--${variant}`}>
      <Form
        onSubmit={event => {
          event.preventDefault()
          void send()
        }}
        className="tamizhi-composer__form">
        <div
          className="tamizhi__perch"
          ref={avatarSlotRef}
          aria-hidden="true"
        />
        <input
          ref={fileInput}
          type="file"
          multiple
          className="hidden"
          aria-label="Attach files"
          accept={[
            '.txt,.md,.csv,.json',
            allowImages ? '.png,.jpg,.jpeg,.gif,.webp' : '',
            allowPDF ? '.pdf' : ''
          ]
            .filter(Boolean)
            .join(',')}
          onChange={event => {
            const selectedFiles = Array.from(
              event.currentTarget.files ?? []
            ).map(file => ({ id: createId(), file }))
            setFiles(current => [...current, ...selectedFiles])
            event.currentTarget.value = ''
          }}
        />
        {files.length > 0 && (
          <div className="tamizhi-composer__attachments" aria-live="polite">
            {files.map(({ id, file }) => (
              <span key={id} className="tamizhi-composer__file">
                <span className="min-w-0 truncate">{file.name}</span>
                <Button
                  aria-label={`Remove ${file.name}`}
                  type="button"
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  className="tamizhi-composer__file-remove"
                  onPress={() =>
                    setFiles(current => current.filter(item => item.id !== id))
                  }>
                  <CloseCircle size={14} aria-hidden="true" />
                </Button>
              </span>
            ))}
          </div>
        )}
        <TextField
          value={text}
          onChange={value => {
            setText(value)
            signalListening()
          }}
          isDisabled={isOffline}
          className="min-w-0">
          <Label className="sr-only">Message Tamizhi</Label>
          <TextArea
            ref={inputRef}
            placeholder={isOffline ? 'You’re offline' : 'Ask Tamizhi anything'}
            maxLength={4000}
            rows={1}
            className="tamizhi-composer__input"
            onFocus={() => signalListening(800)}
            onBlur={stopListening}
            onInput={event => {
              signalListening()
              event.currentTarget.style.height = 'auto'
              event.currentTarget.style.height = `${Math.min(208, event.currentTarget.scrollHeight)}px`
            }}
            onKeyDown={event => {
              if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault()
                void send()
              }
            }}
          />
        </TextField>
        <ComposerToolbar
          api={api}
          allowVoice={allowVoice}
          isOffline={isOffline}
          isStreaming={isStreaming}
          model={model}
          models={models}
          onModelChange={onModelChange}
          isFastMode={isFastMode}
          onFastModeChange={onFastModeChange}
          permission={permission}
          onPermissionChange={onPermissionChange}
          onStop={onStop}
          variant={variant}
          voice={voice}
          canSend={
            Boolean(text.trim()) && isReady && !isOffline && !isReadingFiles
          }
          onAttach={() => fileInput.current?.click()}
        />
      </Form>
      {(fileError || voice.error) && (
        <p role="alert" className="text-danger px-2 pt-1 text-xs">
          {fileError ?? voice.error}
        </p>
      )}
      {note && <div className="tamizhi-composer__note">{note}</div>}
    </div>
  )
}

export const Composer = (props: ComposerProps) => (
  <ComposerLayout {...props} variant="app" />
)
