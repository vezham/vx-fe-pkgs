import { useCallback, useEffect, useRef, useState } from 'react'

import { writeClipboardText } from './write-clipboard-text'

export type CopyToClipboardStatus = 'idle' | 'copied' | 'unavailable'

export const useCopyToClipboard = () => {
  const [status, setStatus] = useState<CopyToClipboardStatus>('idle')
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const latestCopy = useRef(0)
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      latestCopy.current += 1
      clearTimeout(resetTimer.current)
    }
  }, [])

  const copy = useCallback(async (text: string) => {
    const attempt = ++latestCopy.current
    let copied: boolean
    try {
      await writeClipboardText(text)
      copied = true
    } catch {
      copied = false
    }

    if (!mounted.current || attempt !== latestCopy.current) return copied

    clearTimeout(resetTimer.current)
    setStatus(copied ? 'copied' : 'unavailable')
    if (copied) {
      resetTimer.current = setTimeout(() => {
        resetTimer.current = undefined
        setStatus('idle')
      }, 2000)
    }
    return copied
  }, [])

  return {
    copy,
    status,
    isCopied: status === 'copied',
    isUnavailable: status === 'unavailable'
  }
}
