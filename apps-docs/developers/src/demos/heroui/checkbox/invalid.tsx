// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Checkbox, FieldError } from '@vezham/react-v3'

export function Invalid() {
  return (
    <Checkbox isInvalid isRequired name="agreement">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        I agree to the terms
      </Checkbox.Content>
      <FieldError>You must accept the terms to continue</FieldError>
    </Checkbox>
  )
}
