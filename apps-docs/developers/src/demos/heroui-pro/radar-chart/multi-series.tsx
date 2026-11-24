// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { RadarChart } from '@vezham/react-pro-v3/radar-chart'
import { Card } from '@vezham/react-v3'

const metricsData = [
  { category: 'Jan', desktop: 65, mobile: 50, tablet: 40 },
  { category: 'Feb', desktop: 72, mobile: 58, tablet: 45 },
  { category: 'Mar', desktop: 80, mobile: 65, tablet: 52 },
  { category: 'Apr', desktop: 78, mobile: 70, tablet: 48 },
  { category: 'May', desktop: 85, mobile: 60, tablet: 55 },
  { category: 'Jun', desktop: 90, mobile: 75, tablet: 60 }
]

export function MultiSeries() {
  return (
    <Card className="w-[480px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Device Usage</Card.Title>
        <div className="flex items-center gap-3">
          {[
            { color: 'var(--chart-4)', label: 'Desktop' },
            { color: 'var(--chart-3)', label: 'Mobile' },
            { color: 'var(--chart-1)', label: 'Tablet' }
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
      <Card.Content className="flex flex-col items-center">
        <RadarChart data={metricsData} height={300}>
          <RadarChart.Grid />
          <RadarChart.AngleAxis dataKey="category" />
          <RadarChart.Radar
            dataKey="desktop"
            dot={false}
            fill="var(--chart-4)"
            fillOpacity={0.1}
            name="Desktop"
            stroke="var(--chart-4)"
            strokeWidth={2}
          />
          <RadarChart.Radar
            dataKey="mobile"
            dot={false}
            fill="var(--chart-3)"
            fillOpacity={0.1}
            name="Mobile"
            stroke="var(--chart-3)"
            strokeWidth={2}
          />
          <RadarChart.Radar
            dataKey="tablet"
            dot={false}
            fill="var(--chart-1)"
            fillOpacity={0.1}
            name="Tablet"
            stroke="var(--chart-1)"
            strokeWidth={2}
          />
          <RadarChart.Tooltip content={<RadarChart.TooltipContent />} />
        </RadarChart>
      </Card.Content>
    </Card>
  )
}
