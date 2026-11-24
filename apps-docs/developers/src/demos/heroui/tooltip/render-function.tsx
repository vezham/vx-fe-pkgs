// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { CircleInfo } from '@gravity-ui/icons'

import { Button, Tooltip } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip delay={0}>
        <Button variant="secondary">Hover me</Button>
        <Tooltip.Content render={props => <div {...props} data-custom="foo" />}>
          <p>This is a tooltip</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Button isIconOnly aria-label="More information" variant="tertiary">
          <CircleInfo />
        </Button>
        <Tooltip.Content render={props => <div {...props} data-custom="foo" />}>
          <p>More information</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  )
}
