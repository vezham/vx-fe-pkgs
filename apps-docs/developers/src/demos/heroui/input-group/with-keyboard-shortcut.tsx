// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { InputGroup, Kbd, TextField } from '@vezham/react-v3'

export function WithKeyboardShortcut() {
  return (
    <TextField
      aria-label="Command"
      className="w-full max-w-[280px]"
      name="command">
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          placeholder="Command"
        />
        <InputGroup.Suffix className="pe-2">
          <Kbd>
            <Kbd.Abbr keyValue="command" />
            <Kbd.Content>K</Kbd.Content>
          </Kbd>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  )
}
