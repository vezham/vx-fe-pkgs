// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Label, NumberField } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <NumberField
      className="w-full max-w-64"
      defaultValue={1024}
      minValue={0}
      name="width"
      render={props => <div {...props} data-custom="foo" />}>
      <Label>Width</Label>
      <NumberField.Group>
        <NumberField.DecrementButton />
        <NumberField.Input className="w-[120px]" />
        <NumberField.IncrementButton />
      </NumberField.Group>
    </NumberField>
  )
}
