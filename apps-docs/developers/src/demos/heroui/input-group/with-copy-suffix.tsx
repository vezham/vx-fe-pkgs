// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Copy } from '@gravity-ui/icons'

import { Button, InputGroup, Label, TextField } from '@vezham/react-v3'

export function WithCopySuffix() {
  return (
    <TextField
      className="w-full max-w-[280px]"
      defaultValue="heroui.com"
      name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" />
        <InputGroup.Suffix className="pe-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <Copy className="size-4" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  )
}
