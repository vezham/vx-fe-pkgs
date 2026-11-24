// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Switch } from '@vezham/react-v3'

export function RenderProps() {
  return (
    <Switch>
      {({ isSelected }) => (
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          {isSelected ? 'Enabled' : 'Disabled'}
        </Switch.Content>
      )}
    </Switch>
  )
}
