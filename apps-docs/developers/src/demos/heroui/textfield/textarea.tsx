// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Description, Label, TextArea, TextField } from '@vezham/react-v3'

export function TextAreaExample() {
  return (
    <TextField className="w-full max-w-64" name="message">
      <Label>Message</Label>
      <TextArea placeholder="Write your message here..." rows={4} />
      <Description>Maximum 500 characters</Description>
    </TextField>
  )
}
