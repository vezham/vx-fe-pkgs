// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { BarChart } from '@vezham/react-pro-v3/bar-chart'
import { Card } from '@vezham/react-v3'

const topProducts = [
  { product: 'Widgets', units: 1842 },
  { product: 'Gadgets', units: 1567 },
  { product: 'Modules', units: 1231 },
  { product: 'Plugins', units: 985 },
  { product: 'Add-ons', units: 743 }
]

export function Horizontal() {
  return (
    <Card className="w-full max-w-[420px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Top Products</Card.Title>
        <Card.Description className="text-muted text-xs">
          Units sold this quarter
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <BarChart data={topProducts} height={220} layout="vertical">
          <BarChart.XAxis tickMargin={4} type="number" />
          <BarChart.YAxis
            dataKey="product"
            tickMargin={4}
            type="category"
            width={60}
          />
          <BarChart.Bar
            barSize={14}
            dataKey="units"
            fill="var(--chart-3)"
            name="Units"
            radius={[0, 24, 24, 0]}
          />
          <BarChart.Tooltip content={<BarChart.TooltipContent />} />
        </BarChart>
      </Card.Content>
    </Card>
  )
}
