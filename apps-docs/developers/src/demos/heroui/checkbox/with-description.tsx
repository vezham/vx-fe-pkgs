// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Checkbox, Description } from '@vezham/react-v3'

export function WithDescription() {
  return (
    <Checkbox name="description-notifications">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Email notifications
      </Checkbox.Content>
      <Description>
        Get notified when someone mentions you in a comment
      </Description>
    </Checkbox>
  )
}
