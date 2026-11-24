// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Envelope } from '@gravity-ui/icons'

import {
  Description,
  InputGroup,
  Label,
  Surface,
  TextField
} from '@vezham/react-v3'

export function OnSurface() {
  return (
    <Surface className="rounded-2xl p-6">
      <TextField className="w-full max-w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup variant="secondary">
          <InputGroup.Prefix>
            <Envelope className="text-muted size-4" />
          </InputGroup.Prefix>
          <InputGroup.Input
            className="w-full max-w-[280px]"
            placeholder="name@email.com"
          />
        </InputGroup>
        <Description>We'll never share this with anyone else</Description>
      </TextField>
    </Surface>
  )
}
