// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import {
  Button,
  Checkbox,
  CheckboxGroup,
  FieldError,
  Form,
  Label
} from '@vezham/react-v3'

export function Validation() {
  return (
    <Form
      className="flex flex-col gap-4 px-4"
      onSubmit={e => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const values = formData.getAll('preferences')

        alert(`Selected preferences: ${values.join(', ')}`)
      }}>
      <CheckboxGroup isRequired name="preferences">
        <Label>Preferences</Label>
        <Checkbox value="email">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Email notifications
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="sms">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            SMS notifications
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="push">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Push notifications
          </Checkbox.Content>
        </Checkbox>
        <FieldError>Please select at least one notification method.</FieldError>
      </CheckboxGroup>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
