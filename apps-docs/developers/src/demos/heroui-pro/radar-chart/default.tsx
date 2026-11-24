// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartTooltip } from '@vezham/react-pro-v3'
import { RadarChart } from '@vezham/react-pro-v3/radar-chart'
import { Card } from '@vezham/react-v3'

const skillsData = [
  { category: 'Design', score: 86 },
  { category: 'Frontend', score: 92 },
  { category: 'Backend', score: 74 },
  { category: 'DevOps', score: 65 },
  { category: 'Testing', score: 78 },
  { category: 'Leadership', score: 70 }
]

export function Default() {
  return (
    <Card className="w-[420px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Skill Assessment</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center">
        <RadarChart data={skillsData} height={280}>
          <RadarChart.Grid />
          <RadarChart.AngleAxis dataKey="category" />
          <RadarChart.Radar
            dataKey="score"
            dot={{ fill: 'var(--chart-3)', r: 3, strokeWidth: 0 }}
            fill="var(--chart-3)"
            fillOpacity={0.15}
            name="Score"
            stroke="var(--chart-3)"
            strokeWidth={2}
          />
          <RadarChart.Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const category = payload[0]?.payload?.category as
                string | undefined

              return (
                <ChartTooltip>
                  {category ? (
                    <ChartTooltip.Header>{category}</ChartTooltip.Header>
                  ) : null}
                  {payload.map(entry => (
                    <ChartTooltip.Item key={String(entry.dataKey)}>
                      <ChartTooltip.Indicator
                        color={entry.color ?? entry.stroke ?? entry.fill}
                      />
                      <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
                      <ChartTooltip.Value>{entry.value}</ChartTooltip.Value>
                    </ChartTooltip.Item>
                  ))}
                </ChartTooltip>
              )
            }}
          />
        </RadarChart>
      </Card.Content>
    </Card>
  )
}
