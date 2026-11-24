// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Description, Input, Label, TextField } from '@vezham/react-v3'

export function Required() {
  return (
    <TextField isRequired className="w-full max-w-64" name="fullName">
      <Label>Full Name</Label>
      <Input placeholder="John Doe" />
      <Description>This field is required</Description>
    </TextField>
  )
}
