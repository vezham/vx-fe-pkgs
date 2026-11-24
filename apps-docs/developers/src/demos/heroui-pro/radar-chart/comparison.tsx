// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { RadarChart } from '@vezham/react-pro-v3/radar-chart'
import { Card } from '@vezham/react-v3'

const comparisonData = [
  { category: 'Speed', teamA: 85, teamB: 70 },
  { category: 'Reliability', teamA: 78, teamB: 88 },
  { category: 'Security', teamA: 90, teamB: 75 },
  { category: 'UX', teamA: 72, teamB: 82 },
  { category: 'Performance', teamA: 88, teamB: 68 },
  { category: 'Scalability', teamA: 65, teamB: 80 }
]

export function Comparison() {
  return (
    <Card className="w-[460px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Platform Comparison</Card.Title>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-3)' }}
            />
            <span className="text-muted text-xs">Team A</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: 'var(--chart-1)' }}
            />
            <span className="text-muted text-xs">Team B</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content className="flex flex-col items-center">
        <RadarChart data={comparisonData} height={300}>
          <RadarChart.Grid />
          <RadarChart.AngleAxis dataKey="category" />
          <RadarChart.Radar
            dataKey="teamA"
            dot={{ fill: 'var(--chart-3)', r: 3, strokeWidth: 0 }}
            fill="var(--chart-3)"
            fillOpacity={0.15}
            name="Team A"
            stroke="var(--chart-3)"
            strokeWidth={2}
          />
          <RadarChart.Radar
            dataKey="teamB"
            dot={{ fill: 'var(--chart-1)', r: 3, strokeWidth: 0 }}
            fill="var(--chart-1)"
            fillOpacity={0.15}
            name="Team B"
            stroke="var(--chart-1)"
            strokeWidth={2}
          />
          <RadarChart.Tooltip content={<RadarChart.TooltipContent />} />
        </RadarChart>
      </Card.Content>
    </Card>
  )
}
