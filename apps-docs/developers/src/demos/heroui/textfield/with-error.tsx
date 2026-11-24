// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { FieldError, Input, Label, TextField } from '@vezham/react-v3'

export function WithError() {
  return (
    <TextField isInvalid className="w-full max-w-64" name="email" type="email">
      <Label>Email</Label>
      <Input placeholder="user@example.com" />
      <FieldError>Please enter a valid email address</FieldError>
    </TextField>
  )
}
