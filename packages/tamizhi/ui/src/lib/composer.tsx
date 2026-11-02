import { useEffect, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'

import {
  ArrowUp,
  CloseCircle,
  Microphone,
  Paperclip,
  Stop
} from '@vezham/icons-react'
import {
  Button,
  Form,
  Label,
  TextArea,
  TextField,
  Tooltip
} from '@vezham/react-v3'
import type { TamizhiAPIClient } from '@vezham/tamizhi-client'
import type { APIAttachment, ModelInfo } from '@vezham/tamizhi-contracts'

import { readTextAttachments } from './attachments'
import { ComposerControls } from './controls'
import { FastModeToggle, ModelPicker } from './model-picker'
import { PermissionPicker } from './permission-picker'
import { TamizhiPluginSlot } from './plugins'
import { useVoiceInput } from './use-voice-input'

export interface ComposerProps {
  api?: TamizhiAPIClient
  allowImages?: boolean
  allowPDF?: boolean
  allowVoice?: boolean
  isStreaming: boolean
  isReady: boolean
  isOffline: boolean
  model: string
  models?: ModelInfo[]
  onModelChange: (model: string) => void
  isFastMode: boolean
  onFastModeChange: (isFastMode: boolean) => void
  permission: string
  onPermissionChange: (permission: string) => void
  note?: ReactNode
  avatarSlotRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLTextAreaElement | null>
  onListeningChange: (isListening: boolean) => void
  onSend: (prompt: string, attachments?: APIAttachment[]) => void
  onStop: () => void
}

interface ComposerLayoutProps extends ComposerProps {
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
}: ComposerLayoutProps) => {
  const [text, setText] = useState('')
  const voice = useVoiceInput(
    api,
    transcript =>
      setText(current => [current, transcript].filter(Boolean).join(' ')),
    onListeningChange
  )
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [isReadingFiles, setIsReadingFiles] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const listeningTimer = useRef<number | undefined>(undefined)
  const signalListening = (duration = 1100) => {
    onListeningChange(true)
    if (listeningTimer.current !== undefined)
      window.clearTimeout(listeningTimer.current)
    listeningTimer.current = window.setTimeout(() => {
      listeningTimer.current = undefined
      onListeningChange(false)
    }, duration)
  }
  const stopListening = () => {
    if (listeningTimer.current !== undefined)
      window.clearTimeout(listeningTimer.current)
    listeningTimer.current = undefined
    onListeningChange(false)
  }
  useEffect(
    () => () => {
      if (listeningTimer.current !== undefined)
        window.clearTimeout(listeningTimer.current)
    },
    []
  )
  const send = async () => {
    if (!text.trim() || isStreaming || !isReady || isOffline || isReadingFiles)
      return
    stopListening()
    setFileError(null)
    setIsReadingFiles(true)
    try {
      if (files.length > 8) throw new Error('Attach up to eight files.')
      if (api) {
        const attachments = await Promise.all(
          files.map(file => api.upload(file))
        )
        onSend(text, attachments)
      } else {
        const content = await readTextAttachments(files)
        onSend([text, ...content].join('\n\n'))
      }
      setText('')
      setFiles([])
      if (inputRef.current) inputRef.current.style.height = ''
      inputRef.current?.focus()
    } catch (error) {
      setFileError(
        error instanceof Error
          ? error.message
          : 'Unable to read the attached files.'
      )
    } finally {
      setIsReadingFiles(false)
    }
  }
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
            const selectedFiles = Array.from(event.currentTarget.files ?? [])
            setFiles(current => [...current, ...selectedFiles])
            event.currentTarget.value = ''
          }}
        />
        {files.length > 0 && (
          <div className="tamizhi-composer__attachments" aria-live="polite">
            {files.map((file, index) => (
              <span
                key={`${file.name}-${index}`}
                className="tamizhi-composer__file">
                <span className="min-w-0 truncate">{file.name}</span>
                <Button
                  aria-label={`Remove ${file.name}`}
                  type="button"
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  className="tamizhi-composer__file-remove"
                  onPress={() =>
                    setFiles(current =>
                      current.filter((_, item) => item !== index)
                    )
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
                onPress={() => fileInput.current?.click()}>
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
                  aria-label={
                    voice.isRecording ? 'Finish recording' : 'Voice input'
                  }
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
                isDisabled={
                  !text.trim() || !isReady || isOffline || isReadingFiles
                }>
                <ArrowUp size={24} aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
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
