// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Input, Label, TextField } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <TextField
      className="w-full max-w-64"
      name="email"
      render={props => <div {...props} data-custom="foo" />}
      type="email">
      <Label>Email</Label>
      <Input placeholder="Enter your email" />
    </TextField>
  )
}
