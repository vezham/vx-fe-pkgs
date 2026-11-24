// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TrashBin } from '@gravity-ui/icons'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function HoldConfirmDurations() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        Different hold durations: fast (800ms), default (2s), slow (4s).
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm
            className="bg-danger text-danger-foreground"
            duration={800}>
            <TrashBin />
            Fast (800ms)
          </PressableFeedback.HoldConfirm>
          <TrashBin />
          Fast (800ms)
        </Button>
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm className="bg-danger text-danger-foreground">
            <TrashBin />
            Default (2s)
          </PressableFeedback.HoldConfirm>
          <TrashBin />
          Default (2s)
        </Button>
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm
            className="bg-danger text-danger-foreground"
            duration={4000}>
            <TrashBin />
            Slow (4s)
          </PressableFeedback.HoldConfirm>
          <TrashBin />
          Slow (4s)
        </Button>
      </div>
    </div>
  )
}
