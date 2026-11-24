// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Gear, TrashBin } from '@gravity-ui/icons'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function ProgressFeedbackSweep() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        The clip-path reveal can sweep in four directions: right, left, down,
        up.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary">
          <PressableFeedback.ProgressFeedback
            className="bg-accent text-accent-foreground"
            sweep="right">
            <TrashBin />
            Sweep Right
          </PressableFeedback.ProgressFeedback>
          <TrashBin />
          Sweep Right
        </Button>
        <Button variant="secondary">
          <PressableFeedback.ProgressFeedback
            className="bg-accent text-accent-foreground"
            sweep="left">
            <TrashBin />
            Sweep Left
          </PressableFeedback.ProgressFeedback>
          <TrashBin />
          Sweep Left
        </Button>
        <Button variant="secondary">
          <PressableFeedback.ProgressFeedback
            className="bg-accent text-accent-foreground"
            sweep="down">
            <TrashBin />
            Sweep Down
          </PressableFeedback.ProgressFeedback>
          <TrashBin />
          Sweep Down
        </Button>
        <Button variant="secondary">
          <PressableFeedback.ProgressFeedback
            className="bg-accent text-accent-foreground"
            sweep="up">
            <TrashBin />
            Sweep Up
          </PressableFeedback.ProgressFeedback>
          <TrashBin />
          Sweep Up
        </Button>
      </div>

      <div className="flex gap-3">
        <Button isIconOnly variant="secondary">
          <PressableFeedback.ProgressFeedback
            className="bg-accent text-accent-foreground"
            sweep="up">
            <Gear />
          </PressableFeedback.ProgressFeedback>
          <Gear />
        </Button>
        <Button isIconOnly variant="secondary">
          <PressableFeedback.ProgressFeedback
            className="bg-accent text-accent-foreground"
            sweep="down">
            <Gear />
          </PressableFeedback.ProgressFeedback>
          <Gear />
        </Button>
        <Button isIconOnly variant="secondary">
          <PressableFeedback.ProgressFeedback
            className="bg-accent text-accent-foreground"
            sweep="left">
            <Gear />
          </PressableFeedback.ProgressFeedback>
          <Gear />
        </Button>
      </div>
    </div>
  )
}
