// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function Comparison() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-muted mb-2 block text-xs font-medium">
          Ripple
        </span>
        <div className="flex flex-wrap gap-3">
          <Button>
            <PressableFeedback.Ripple />
            Primary
          </Button>
          <Button variant="secondary">
            <PressableFeedback.Ripple />
            Secondary
          </Button>
          <Button variant="outline">
            <PressableFeedback.Ripple />
            Outline
          </Button>
        </div>
      </div>

      <div>
        <span className="text-muted mb-2 block text-xs font-medium">
          Highlight
        </span>
        <div className="flex flex-wrap gap-3">
          <Button>
            <PressableFeedback.Highlight />
            Primary
          </Button>
          <Button variant="secondary">
            <PressableFeedback.Highlight />
            Secondary
          </Button>
          <Button variant="outline">
            <PressableFeedback.Highlight />
            Outline
          </Button>
        </div>
      </div>

      <div>
        <span className="text-muted mb-2 block text-xs font-medium">
          Hold Confirm
        </span>
        <div className="flex flex-wrap gap-3">
          <Button>
            <PressableFeedback.HoldConfirm className="bg-accent text-accent-foreground">
              Primary
            </PressableFeedback.HoldConfirm>
            Primary
          </Button>
          <Button variant="secondary">
            <PressableFeedback.HoldConfirm className="bg-accent-soft text-accent-soft-foreground">
              Secondary
            </PressableFeedback.HoldConfirm>
            Secondary
          </Button>
          <Button variant="outline">
            <PressableFeedback.HoldConfirm className="bg-danger text-danger-foreground">
              Outline
            </PressableFeedback.HoldConfirm>
            Outline
          </Button>
        </div>
      </div>

      <div>
        <span className="text-muted mb-2 block text-xs font-medium">
          Progress Feedback
        </span>
        <div className="flex flex-wrap gap-3">
          <Button>
            <PressableFeedback.ProgressFeedback className="bg-accent text-accent-foreground">
              Primary
            </PressableFeedback.ProgressFeedback>
            Primary
          </Button>
          <Button variant="secondary">
            <PressableFeedback.ProgressFeedback className="bg-accent-soft text-accent-soft-foreground">
              Secondary
            </PressableFeedback.ProgressFeedback>
            Secondary
          </Button>
          <Button variant="outline">
            <PressableFeedback.ProgressFeedback className="bg-danger text-danger-foreground">
              Outline
            </PressableFeedback.ProgressFeedback>
            Outline
          </Button>
        </div>
      </div>
    </div>
  )
}
