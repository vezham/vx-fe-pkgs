// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { LocationArrowFill } from '@gravity-ui/icons'
import { useState } from 'react'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function ProgressFeedbackCallback() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button variant="secondary">
        <PressableFeedback.ProgressFeedback
          className="bg-accent text-accent-foreground"
          onComplete={() => setCount(c => c + 1)}>
          <LocationArrowFill />
          Send
        </PressableFeedback.ProgressFeedback>
        <LocationArrowFill />
        Send
      </Button>
      <p className="text-muted text-xs">
        Count: <strong>{count}</strong>
      </p>
    </div>
  )
}
