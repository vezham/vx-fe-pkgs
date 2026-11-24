// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Checkbox, Label } from '@vezham/react-v3'

export function ExternalLabel() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="label-marketing">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox.Content>
      </Checkbox>
      <Label htmlFor="label-marketing">Send me marketing emails</Label>
    </div>
  )
}
