// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'

export function AutoContent() {
  return (
    <div className="flex gap-6">
      <ChartTooltip.Content
        active
        indicator="dot"
        label="February"
        payload={[
          { color: 'var(--chart-3)', name: 'Revenue', value: 18200 },
          { color: 'var(--chart-1)', name: 'Expenses', value: 9800 }
        ]}
      />
      <ChartTooltip.Content
        active
        indicator="line"
        label="Q1 2025"
        payload={[
          { name: 'Organic', stroke: 'var(--chart-3)', value: 22000 },
          { name: 'Paid Ads', stroke: 'var(--chart-2)', value: 14500 },
          { name: 'Referral', stroke: 'var(--chart-1)', value: 5200 }
        ]}
      />
    </div>
  )
}
