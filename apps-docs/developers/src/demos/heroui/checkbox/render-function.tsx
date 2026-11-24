// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Checkbox } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <Checkbox render={props => <div {...props} data-custom="bar" />}>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Accept terms and conditions
      </Checkbox.Content>
    </Checkbox>
  )
}
