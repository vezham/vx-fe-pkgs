// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Checkbox, Description } from '@vezham/react-v3'

export function RenderProps() {
  return (
    <Checkbox id="render-props-terms">
      {({ isSelected }) => (
        <>
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            {isSelected ? 'Terms accepted' : 'Accept terms'}
          </Checkbox.Content>
          <Description>
            {isSelected
              ? 'Thank you for accepting'
              : 'Please read and accept the terms'}
          </Description>
        </>
      )}
    </Checkbox>
  )
}
