// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'

export function Inactive() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted text-sm">
        The tooltip below is inactive (active=false) — nothing should render:
      </p>
      <div className="bg-default flex h-16 items-center justify-center rounded-lg">
        <ChartTooltip active={false}>
          <ChartTooltip.Header>This should not be visible</ChartTooltip.Header>
        </ChartTooltip>
        <span className="text-muted text-xs">(empty — tooltip hidden)</span>
      </div>
    </div>
  )
}
