// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Gear, Plus, TrashBin } from '@gravity-ui/icons'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function WithHoldConfirm() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        Press and hold buttons to see the clip-path reveal.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm className="bg-danger text-danger-foreground">
            <TrashBin />
            Hold to Delete
          </PressableFeedback.HoldConfirm>
          <TrashBin />
          Hold to Delete
        </Button>
        <Button variant="secondary">
          <PressableFeedback.HoldConfirm className="bg-accent-soft text-accent-soft-foreground">
            <Gear />
            Hold to Apply
          </PressableFeedback.HoldConfirm>
          <Gear />
          Hold to Apply
        </Button>
        <Button variant="tertiary">
          <PressableFeedback.HoldConfirm className="bg-accent text-accent-foreground">
            <Plus />
            Added!
          </PressableFeedback.HoldConfirm>
          <Plus />
          Hold to Add
        </Button>
      </div>

      <div className="flex gap-3">
        <Button isIconOnly variant="danger-soft">
          <PressableFeedback.HoldConfirm
            className="bg-danger text-danger-foreground"
            sweep="up">
            <TrashBin />
          </PressableFeedback.HoldConfirm>
          <TrashBin />
        </Button>
        <Button isIconOnly variant="secondary">
          <PressableFeedback.HoldConfirm className="bg-accent text-accent-foreground">
            <Gear />
          </PressableFeedback.HoldConfirm>
          <Gear />
        </Button>
      </div>
    </div>
  )
}
