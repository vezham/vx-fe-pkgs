// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Switch } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <Switch render={props => <div {...props} data-custom="foo" />}>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        Enable notifications
      </Switch.Content>
    </Switch>
  )
}
