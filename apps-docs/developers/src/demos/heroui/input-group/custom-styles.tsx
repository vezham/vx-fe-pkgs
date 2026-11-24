// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Envelope } from '@gravity-ui/icons'

import { InputGroup, Label, TextField } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <TextField className="w-full max-w-xs" name="email">
      <Label>Work email</Label>
      <InputGroup className="border-border/80 bg-default rounded-xl border shadow-sm">
        <InputGroup.Prefix>
          <Envelope className="text-muted size-4" />
        </InputGroup.Prefix>
        <InputGroup.Input placeholder="you@company.com" />
      </InputGroup>
    </TextField>
  )
}
