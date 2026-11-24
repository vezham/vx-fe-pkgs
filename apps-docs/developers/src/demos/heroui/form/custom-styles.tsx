// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Button, Form, Input, Label, TextField } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Form
      className="border-border/80 bg-surface flex w-80 flex-col gap-3 rounded-xl border p-4 shadow-sm"
      onSubmit={e => e.preventDefault()}>
      <TextField isRequired name="email" type="email">
        <Label>Work email</Label>
        <Input className="bg-field" placeholder="you@company.com" />
      </TextField>
      <Button className="w-full" type="submit">
        Continue
      </Button>
    </Form>
  )
}
