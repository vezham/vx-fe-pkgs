// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'

export function CustomFormatters() {
  return (
    <ChartTooltip.Content
      active
      label="2025-01-15"
      valueFormatter={value => `${Number(value).toLocaleString()}`}
      labelFormatter={label => {
        const date = new Date(String(label))

        return date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      }}
      payload={[
        { name: 'Portfolio', stroke: 'var(--chart-3)', value: 24801.32 },
        { name: 'Benchmark', stroke: 'var(--chart-2)', value: 21500.0 }
      ]}
    />
  )
}
