// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'
import { BarChart } from '@vezham/react-pro-v3/bar-chart'
import { Card, Chip } from '@vezham/react-v3'

const salesData = [
  { month: 'Jan', sales: 18 },
  { month: 'Feb', sales: 32 },
  { month: 'Mar', sales: 28 },
  { month: 'Apr', sales: 45 },
  { month: 'May', sales: 38 },
  { month: 'Jun', sales: 52 },
  { month: 'Jul', sales: 42 },
  { month: 'Aug', sales: 55 },
  { month: 'Sep', sales: 48 },
  { month: 'Oct', sales: 60 },
  { month: 'Nov', sales: 53 },
  { month: 'Dec', sales: 58 }
]

const ArrowUp = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path d="M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function Default() {
  return (
    <Card className="w-full max-w-[480px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <div>
          <Card.Title className="text-base">Daily Sales</Card.Title>
          <Card.Description className="text-muted text-xs">
            Units sold per month
          </Card.Description>
        </div>
        <Chip color="success" size="sm" variant="soft">
          <ArrowUp className="size-3" />
          12.5%
        </Chip>
      </Card.Header>
      <Card.Content>
        <BarChart data={salesData} height={200}>
          <BarChart.Grid vertical={false} />
          <BarChart.XAxis dataKey="month" tickMargin={8} />
          <BarChart.YAxis width={30} />
          <BarChart.Bar
            barSize={16}
            dataKey="sales"
            fill="var(--accent)"
            radius={[24, 24, 24, 24]}
          />
          <BarChart.Tooltip
            content={({ active, label, payload }) => {
              if (!active || !payload?.length) return null

              return (
                <ChartTooltip>
                  <ChartTooltip.Header>{label}</ChartTooltip.Header>
                  {payload.map(entry => (
                    <ChartTooltip.Item key={String(entry.dataKey)}>
                      <ChartTooltip.Indicator
                        color={entry.color ?? entry.fill}
                      />
                      <ChartTooltip.Label>
                        {entry.name ?? 'Sales'}
                      </ChartTooltip.Label>
                      <ChartTooltip.Value>
                        {entry.value} units
                      </ChartTooltip.Value>
                    </ChartTooltip.Item>
                  ))}
                </ChartTooltip>
              )
            }}
          />
        </BarChart>
      </Card.Content>
    </Card>
  )
}
