// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { BarChart } from '@vezham/react-pro-v3/bar-chart'
import { Card } from '@vezham/react-v3'

const revenueByChannel = [
  { direct: 3200, month: 'Jan', online: 4200, retail: 2800 },
  { direct: 4100, month: 'Feb', online: 5800, retail: 3400 },
  { direct: 3800, month: 'Mar', online: 4900, retail: 3100 },
  { direct: 5200, month: 'Apr', online: 7200, retail: 4200 },
  { direct: 4600, month: 'May', online: 6100, retail: 3800 },
  { direct: 5800, month: 'Jun', online: 8400, retail: 4500 }
]

export function Grouped() {
  return (
    <Card className="w-full max-w-[480px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Revenue by Channel</Card.Title>
        <div className="flex items-center gap-3">
          {[
            { color: 'var(--chart-3)', label: 'Online' },
            { color: 'var(--chart-2)', label: 'Retail' },
            { color: 'var(--chart-1)', label: 'Direct' }
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </Card.Header>
      <Card.Content>
        <BarChart data={revenueByChannel} height={220}>
          <BarChart.Grid vertical={false} />
          <BarChart.XAxis dataKey="month" tickMargin={8} />
          <BarChart.YAxis
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
            width={40}
          />
          <BarChart.Bar
            barSize={10}
            dataKey="online"
            fill="var(--chart-3)"
            name="Online"
            radius={[4, 4, 0, 0]}
          />
          <BarChart.Bar
            barSize={10}
            dataKey="retail"
            fill="var(--chart-2)"
            name="Retail"
            radius={[4, 4, 0, 0]}
          />
          <BarChart.Bar
            barSize={10}
            dataKey="direct"
            fill="var(--chart-1)"
            name="Direct"
            radius={[4, 4, 0, 0]}
          />
          <BarChart.Tooltip
            content={
              <BarChart.TooltipContent
                valueFormatter={v => `${Number(v).toLocaleString()}`}
              />
            }
          />
        </BarChart>
      </Card.Content>
    </Card>
  )
}
