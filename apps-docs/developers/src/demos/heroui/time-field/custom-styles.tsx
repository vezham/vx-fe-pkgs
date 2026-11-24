// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Description, Label, TimeField } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <TimeField className="w-full max-w-48 gap-1.5" name="reminder">
      <Label className="text-foreground font-medium">Reminder time</Label>
      <Description>Daily check-in notification.</Description>
      <TimeField.Group className="border-border/80 bg-surface ring-accent/5 focus-within:border-accent/25 focus-within:ring-accent/15 rounded-xl border px-2 py-1 shadow-sm ring-1 focus-within:ring-2">
        <TimeField.Input>
          {segment => (
            <TimeField.Segment className="text-foreground" segment={segment} />
          )}
        </TimeField.Input>
      </TimeField.Group>
    </TimeField>
  )
}
