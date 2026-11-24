// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { InputGroup, Spinner, TextField } from '@vezham/react-v3'

export function WithLoadingSuffix() {
  return (
    <TextField
      className="w-full max-w-[280px]"
      defaultValue="Sending..."
      name="status">
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" />
        <InputGroup.Suffix>
          <Spinner className="size-4" />
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  )
}
