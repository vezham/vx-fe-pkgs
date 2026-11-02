import { useEffect, useRef, useState } from 'react'

import type { TamizhiAPIClient } from '@vezham/tamizhi-client'

export const useVoiceInput = (
  api: TamizhiAPIClient | undefined,
  onText: (text: string) => void,
  onListeningChange?: (value: boolean) => void
) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recorder = useRef<MediaRecorder | null>(null)
  const request = useRef<AbortController | null>(null)
  const mounted = useRef(false)
  const starting = useRef(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      request.current?.abort()
      if (timeout.current) clearTimeout(timeout.current)
      if (recorder.current?.state === 'recording') recorder.current.stop()
      recorder.current?.stream.getTracks().forEach(track => track.stop())
    }
  }, [])
  const toggle = async () => {
    if (recorder.current?.state === 'recording') {
      recorder.current.stop()
      return
    }
    if (starting.current || isTranscribing || !api) return
    starting.current = true
    setError(null)
    try {
      if (
        !navigator.mediaDevices?.getUserMedia ||
        typeof MediaRecorder === 'undefined'
      )
        throw new Error(
          'Voice input requires a supported browser and a secure connection.'
        )
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!mounted.current) {
        stream.getTracks().forEach(track => track.stop())
        return
      }
      let capture: MediaRecorder
      try {
        capture = new MediaRecorder(stream)
      } catch (failure) {
        stream.getTracks().forEach(track => track.stop())
        throw failure
      }
      recorder.current = capture
      const chunks: Blob[] = []
      let size = 0
      capture.ondataavailable = event => {
        size += event.data.size
        chunks.push(event.data)
        if (size > 9_000_000 && capture.state === 'recording') capture.stop()
      }
      capture.onstop = () => {
        stream.getTracks().forEach(track => track.stop())
        if (timeout.current) clearTimeout(timeout.current)
        if (!mounted.current) return
        setIsRecording(false)
        onListeningChange?.(false)
        setIsTranscribing(true)
        const controller = new AbortController()
        request.current = controller
        const mime = capture.mimeType || 'audio/webm'
        const extension = mime.includes('mp4')
          ? 'mp4'
          : mime.includes('ogg')
            ? 'ogg'
            : 'webm'
        const file = new File(chunks, `recording.${extension}`, { type: mime })
        void api
          .transcribe(file, controller.signal)
          .then(result => {
            if (!controller.signal.aborted) onText(result.text)
          })
          .catch(() => {
            if (!controller.signal.aborted)
              setError('Unable to transcribe the recording.')
          })
          .finally(() => {
            if (!controller.signal.aborted) setIsTranscribing(false)
          })
      }
      capture.start(1000)
      setIsRecording(true)
      onListeningChange?.(true)
      timeout.current = setTimeout(() => {
        if (capture.state === 'recording') capture.stop()
      }, 60_000)
    } catch (failure) {
      if (mounted.current)
        setError(
          failure instanceof DOMException && failure.name === 'NotAllowedError'
            ? 'Microphone permission was denied. Allow microphone access to use voice input.'
            : failure instanceof DOMException &&
                failure.name === 'NotFoundError'
              ? 'No microphone was found.'
              : failure instanceof DOMException &&
                  failure.name === 'NotSupportedError'
                ? 'Audio recording is not supported in this browser.'
                : failure instanceof Error
                  ? failure.message
                  : 'Unable to record audio.'
        )
    } finally {
      starting.current = false
    }
  }
  return { isRecording, isTranscribing, error, toggle }
}
