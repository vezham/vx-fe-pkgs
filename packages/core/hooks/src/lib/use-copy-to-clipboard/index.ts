import { useCallback, useState } from 'react'

import { writeClipboardText } from './write-clipboard-text'

export type CopyToClipboardStatus = 'idle' | 'copied' | 'unavailable'

export const useCopyToClipboard = () => {
  const [status, setStatus] = useState<CopyToClipboardStatus>('idle')
  const copy = useCallback(async (text: string) => {
    try {
      await writeClipboardText(text)
      setStatus('copied')
      return true
    } catch {
      setStatus('unavailable')
      return false
    }
  }, [])

  return {
    copy,
    status,
    isCopied: status === 'copied',
    isUnavailable: status === 'unavailable'
  }
}
