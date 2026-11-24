// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Checkbox, Description } from '@vezham/react-v3'

export function Disabled() {
  return (
    <Checkbox isDisabled id="feature">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Premium Feature
      </Checkbox.Content>
      <Description>This feature is coming soon</Description>
    </Checkbox>
  )
}
