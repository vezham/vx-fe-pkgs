// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TrashBin } from '@gravity-ui/icons'
import { useState } from 'react'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function HoldConfirmCallback() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button variant="danger-soft">
        <PressableFeedback.HoldConfirm
          className="bg-danger text-danger-foreground"
          onComplete={() => setCount(c => c + 1)}>
          <TrashBin />
          Hold to Delete
        </PressableFeedback.HoldConfirm>
        <TrashBin />
        Hold to Delete
      </Button>
      <p className="text-muted text-xs">
        Count: <strong>{count}</strong>
      </p>
    </div>
  )
}
