// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import React from 'react'

import {
  Button,
  Description,
  FieldError,
  Form,
  Label,
  Radio,
  RadioGroup
} from '@vezham/react-v3'

export function Validation() {
  const [message, setMessage] = React.useState<string | null>(null)

  return (
    <Form
      className="flex flex-col gap-4"
      onSubmit={e => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const value = formData.get('plan-validation')

        setMessage(`Your chosen plan is: ${value}`)
      }}>
      <RadioGroup isRequired name="plan-validation">
        <Label>Subscription plan</Label>
        <Radio value="starter">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Starter
          </Radio.Content>
          <Description>For side projects and small teams</Description>
        </Radio>
        <Radio value="pro">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Pro
          </Radio.Content>
          <Description>Advanced reporting and analytics</Description>
        </Radio>
        <Radio value="teams">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Teams
          </Radio.Content>
          <Description>Share access with up to 10 teammates</Description>
        </Radio>
        <FieldError>Choose a subscription before continuing.</FieldError>
      </RadioGroup>
      <Button className="mt-2 w-fit" type="submit">
        Submit
      </Button>
      {!!message && <p className="text-muted text-sm">{message}</p>}
    </Form>
  )
}
