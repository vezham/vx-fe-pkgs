// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Gear, TrashBin } from '@gravity-ui/icons'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button isDisabled>
          <PressableFeedback.Ripple />
          Disabled Ripple
        </Button>
        <Button isDisabled variant="secondary">
          <PressableFeedback.Ripple />
          Secondary
        </Button>
        <Button isDisabled isIconOnly variant="tertiary">
          <PressableFeedback.Ripple />
          <Gear />
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button isDisabled>
          <PressableFeedback.Highlight />
          Disabled Highlight
        </Button>
        <Button isDisabled variant="secondary">
          <PressableFeedback.Highlight />
          Secondary
        </Button>
        <Button isDisabled isIconOnly variant="tertiary">
          <PressableFeedback.Highlight />
          <Gear />
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button isDisabled variant="danger-soft">
          <PressableFeedback.HoldConfirm className="bg-danger text-danger-foreground">
            <TrashBin />
            Disabled Hold
          </PressableFeedback.HoldConfirm>
          <TrashBin />
          Disabled Hold
        </Button>
        <Button isDisabled variant="secondary">
          <PressableFeedback.HoldConfirm className="bg-accent-soft text-accent-soft-foreground">
            Secondary
          </PressableFeedback.HoldConfirm>
          Secondary
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button isDisabled variant="danger-soft">
          <PressableFeedback.ProgressFeedback className="bg-danger text-danger-foreground">
            <TrashBin />
            Disabled Progress
          </PressableFeedback.ProgressFeedback>
          <TrashBin />
          Disabled Progress
        </Button>
        <Button isDisabled variant="secondary">
          <PressableFeedback.ProgressFeedback className="bg-accent-soft text-accent-soft-foreground">
            Secondary
          </PressableFeedback.ProgressFeedback>
          Secondary
        </Button>
      </div>
    </div>
  )
}
