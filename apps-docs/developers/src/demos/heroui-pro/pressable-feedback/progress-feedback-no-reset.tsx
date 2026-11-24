// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Gear, TrashBin } from '@gravity-ui/icons'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function ProgressFeedbackNoReset() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        With autoReset=false, the overlay stays revealed after progress
        completes.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="danger-soft">
          <PressableFeedback.ProgressFeedback
            autoReset={false}
            className="bg-danger text-danger-foreground">
            <TrashBin />
            Account Deleted
          </PressableFeedback.ProgressFeedback>
          <TrashBin />
          Delete Account
        </Button>
        <Button variant="secondary">
          <PressableFeedback.ProgressFeedback
            autoReset={false}
            className="bg-accent text-accent-foreground">
            <Gear />
            Settings Applied
          </PressableFeedback.ProgressFeedback>
          <Gear />
          Apply Settings
        </Button>
      </div>
    </div>
  )
}
