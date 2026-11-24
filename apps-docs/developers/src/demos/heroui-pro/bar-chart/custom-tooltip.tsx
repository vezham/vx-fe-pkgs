// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'
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

export function CustomTooltip() {
  return (
    <Card className="w-full max-w-[480px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Revenue by Channel</Card.Title>
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
            content={({ active, label, payload }) => {
              if (
                !active ||
                !payload?.length ||
                !payload.every(entry => typeof entry.value === 'number')
              )
                return null

              const total = payload.reduce(
                (sum, entry) => sum + ((entry.value as number) ?? 0),
                0
              )

              return (
                <ChartTooltip>
                  <ChartTooltip.Header>{label}</ChartTooltip.Header>
                  {payload.map((entry, idx) => (
                    <ChartTooltip.Item key={idx}>
                      <ChartTooltip.Indicator color={entry.fill} />
                      <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
                      <ChartTooltip.Value>
                        ${Number(entry.value).toLocaleString()}
                      </ChartTooltip.Value>
                    </ChartTooltip.Item>
                  ))}
                  <div className="border-separator mt-1 flex items-center justify-between border-t pt-1.5">
                    <span className="text-muted text-xs font-medium">
                      Total
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </ChartTooltip>
              )
            }}
          />
        </BarChart>
      </Card.Content>
    </Card>
  )
}
