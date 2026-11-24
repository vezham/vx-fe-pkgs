// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import type { ChatStatus } from '@vezham/react-pro-v3'
import { PromptInput } from '@vezham/react-pro-v3'

export function RunState() {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<ChatStatus>('ready')
  const timersRef = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(timer => window.clearTimeout(timer))
    timersRef.current = []
  }, [])

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  const handleStop = () => {
    clearTimers()
    setStatus('ready')
  }

  const handleSubmit = () => {
    const trimmed = value.trim()

    if (!trimmed || status !== 'ready') return

    setValue('')
    setStatus('submitted')
    clearTimers()

    timersRef.current.push(
      window.setTimeout(() => setStatus('streaming'), 400),
      window.setTimeout(() => setStatus('ready'), 1800)
    )
  }

  return (
    <div className="w-full max-w-[640px]">
      <PromptInput
        status={status}
        value={value}
        onStop={handleStop}
        onSubmit={handleSubmit}
        onValueChange={setValue}>
        <PromptInput.Shell>
          <PromptInput.Content>
            <PromptInput.TextArea placeholder="Send to see submitted → streaming → ready" />
          </PromptInput.Content>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarEnd>
              <PromptInput.Send />
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
        <PromptInput.Footer>
          Status-driven send button with stop while generating.
        </PromptInput.Footer>
      </PromptInput>
    </div>
  )
}
