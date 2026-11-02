import { useEffect, useRef, useState } from 'react'

import type { TamizhiAPIClient } from '@vezham/tamizhi-client'

export const useSpeechOutput = (api?: TamizhiAPIClient) => {
  const active = useRef<{ audio: HTMLAudioElement; url: string } | null>(null)
  const request = useRef<AbortController | null>(null)
  const [error, setError] = useState<string | null>(null)
  const stop = () => {
    request.current?.abort()
    if (active.current) {
      active.current.audio.pause()
      URL.revokeObjectURL(active.current.url)
      active.current = null
    }
  }
  useEffect(() => stop, [])
  const speak = async (text: string) => {
    if (!api) return
    stop()
    setError(null)
    const controller = new AbortController()
    request.current = controller
    try {
      const blob = await api.speech(text, controller.signal)
      if (controller.signal.aborted) return
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      active.current = { audio, url }
      audio.onended = () => {
        URL.revokeObjectURL(url)
        if (active.current?.audio === audio) active.current = null
      }
      await audio.play()
    } catch {
      if (!controller.signal.aborted) {
        stop()
        setError('Unable to play this response.')
      }
    }
  }
  return { speak, stop, error }
}
