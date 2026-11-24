// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Gear, TrashBin } from '@gravity-ui/icons'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function HoldConfirmSweep() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        The clip-path reveal can sweep in four directions: right, left, down,
        up.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm
            className="bg-danger text-danger-foreground"
            sweep="right">
            <TrashBin />
            Sweep Right
          </PressableFeedback.HoldConfirm>
          <TrashBin />
          Sweep Right
        </Button>
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm
            className="bg-danger text-danger-foreground"
            sweep="left">
            <TrashBin />
            Sweep Left
          </PressableFeedback.HoldConfirm>
          <TrashBin />
          Sweep Left
        </Button>
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm
            className="bg-danger text-danger-foreground"
            sweep="down">
            <TrashBin />
            Sweep Down
          </PressableFeedback.HoldConfirm>
          <TrashBin />
          Sweep Down
        </Button>
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm
            className="bg-danger text-danger-foreground"
            sweep="up">
            <TrashBin />
            Sweep Up
          </PressableFeedback.HoldConfirm>
          <TrashBin />
          Sweep Up
        </Button>
      </div>

      <div className="flex gap-3">
        <Button isIconOnly variant="secondary">
          <PressableFeedback.HoldConfirm
            className="bg-accent text-accent-foreground"
            sweep="up">
            <Gear />
          </PressableFeedback.HoldConfirm>
          <Gear />
        </Button>
        <Button isIconOnly variant="secondary">
          <PressableFeedback.HoldConfirm
            className="bg-accent text-accent-foreground"
            sweep="down">
            <Gear />
          </PressableFeedback.HoldConfirm>
          <Gear />
        </Button>
        <Button isIconOnly variant="secondary">
          <PressableFeedback.HoldConfirm
            className="bg-accent text-accent-foreground"
            sweep="left">
            <Gear />
          </PressableFeedback.HoldConfirm>
          <Gear />
        </Button>
      </div>
    </div>
  )
}
