import { useEffect, useRef, useState } from 'react'

import { readTextAttachments } from './attachments'
import type { ComposerFile, ComposerProps } from './composer-types'
import { useVoiceInput } from './use-voice-input'

type Props = Pick<
  ComposerProps,
  | 'api'
  | 'isStreaming'
  | 'isReady'
  | 'isOffline'
  | 'inputRef'
  | 'onListeningChange'
  | 'onSend'
>

export const useComposerInput = ({
  api,
  isStreaming,
  isReady,
  isOffline,
  inputRef,
  onListeningChange,
  onSend
}: Props) => {
  const [text, setText] = useState('')
  const voice = useVoiceInput(
    api,
    transcript =>
      setText(current => [current, transcript].filter(Boolean).join(' ')),
    onListeningChange
  )
  const [files, setFiles] = useState<ComposerFile[]>([])
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
          files.map(({ file }) => api.upload(file))
        )
        onSend(text, attachments)
      } else {
        const content = await readTextAttachments(files.map(({ file }) => file))
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

  return {
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
  }
}
