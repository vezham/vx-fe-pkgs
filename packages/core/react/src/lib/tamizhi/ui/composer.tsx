import { useEffect, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'

import { ArrowUp, CloseCircle, Paperclip, Stop } from '@vezham/icons-react'
import {
  Button,
  Form,
  Label,
  TextArea,
  TextField,
  Tooltip
} from '@vezham/react-v3'

import {
  FastModeToggle,
  ModelPicker
} from '../../components/panel/footer/ai/model-picker'
import { PermissionPicker } from '../../components/panel/footer/ai/permission-picker'
import { ComposerControls } from './controls'

export interface ComposerProps {
  isStreaming: boolean
  isReady: boolean
  isOffline: boolean
  model: string
  onModelChange: (model: string) => void
  isFastMode: boolean
  onFastModeChange: (isFastMode: boolean) => void
  permission: string
  onPermissionChange: (permission: string) => void
  note?: ReactNode
  avatarSlotRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLTextAreaElement | null>
  onListeningChange: (isListening: boolean) => void
  onSend: (prompt: string) => void
  onStop: () => void
}

interface ComposerLayoutProps extends ComposerProps {
  variant: 'app' | 'embed'
}

export const ComposerLayout = ({
  variant,
  isStreaming,
  isReady,
  isOffline,
  model,
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
  const [files, setFiles] = useState<File[]>([])
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
  const send = () => {
    if (!text.trim() || isStreaming || !isReady || isOffline) return
    stopListening()
    onSend(text)
    setText('')
    setFiles([])
    if (inputRef.current) inputRef.current.style.height = ''
    inputRef.current?.focus()
  }
  return (
    <div className={`tamizhi-composer tamizhi-composer--${variant}`}>
      <Form
        onSubmit={event => {
          event.preventDefault()
          send()
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
          accept="image/*,.pdf,.txt,.md,.csv,.json"
          onChange={event => {
            setFiles(current => [
              ...current,
              ...Array.from(event.target.files ?? [])
            ])
            event.target.value = ''
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
                send()
              }
            }}
          />
        </TextField>
        <div className="tamizhi-composer__toolbar">
          <div className="tamizhi-composer__toolbar-start">
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
            <ModelPicker model={model} onModelChange={onModelChange} />
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
                isDisabled={!text.trim() || !isReady || isOffline}>
                <ArrowUp size={24} aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </Form>
      {note && <div className="tamizhi-composer__note">{note}</div>}
    </div>
  )
}

export const Composer = (props: ComposerProps) => (
  <ComposerLayout {...props} variant="app" />
)
