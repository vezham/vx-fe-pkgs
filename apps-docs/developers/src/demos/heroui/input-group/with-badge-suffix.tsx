// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Chip, InputGroup, TextField } from '@vezham/react-v3'

export function WithBadgeSuffix() {
  return (
    <TextField
      aria-label="Email address"
      className="w-full max-w-[280px]"
      name="email">
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          placeholder="Email address"
        />
        <InputGroup.Suffix className="pe-2">
          <Chip color="accent" size="md" variant="soft">
            Pro
          </Chip>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  )
}
