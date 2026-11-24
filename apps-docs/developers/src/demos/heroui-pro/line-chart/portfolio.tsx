// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'
import type { Key } from 'react-aria-components/Breadcrumbs'

import { Segment } from '@vezham/react-pro-v3'
import { LineChart } from '@vezham/react-pro-v3/line-chart'
import { Card } from '@vezham/react-v3'

const portfolioDataByRange: Record<
  string,
  { balance: string; change: string; data: { value: number }[] }
> = {
  '1D': {
    balance: '$24,801.32',
    change: '$312.55 (1.28%)',
    data: [
      { value: 24490 },
      { value: 24680 },
      { value: 24350 },
      { value: 24520 },
      { value: 24750 },
      { value: 24410 },
      { value: 24600 },
      { value: 24380 },
      { value: 24720 },
      { value: 24550 },
      { value: 24830 },
      { value: 24460 },
      { value: 24690 },
      { value: 24580 },
      { value: 24801 }
    ]
  },
  '1H': {
    balance: '$24,801.32',
    change: '$42.10 (0.17%)',
    data: [
      { value: 24759 },
      { value: 24820 },
      { value: 24690 },
      { value: 24780 },
      { value: 24650 },
      { value: 24730 },
      { value: 24860 },
      { value: 24710 },
      { value: 24840 },
      { value: 24770 },
      { value: 24900 },
      { value: 24680 },
      { value: 24810 },
      { value: 24750 },
      { value: 24801 }
    ]
  },
  '1M': {
    balance: '$24,801.32',
    change: '$1,242.77 (5.32%)',
    data: [
      { value: 18000 },
      { value: 17500 },
      { value: 17800 },
      { value: 18200 },
      { value: 19000 },
      { value: 18500 },
      { value: 19200 },
      { value: 20500 },
      { value: 20000 },
      { value: 21000 },
      { value: 20800 },
      { value: 22000 },
      { value: 21500 },
      { value: 22800 },
      { value: 24801 }
    ]
  },
  '1W': {
    balance: '$24,801.32',
    change: '$842.18 (3.51%)',
    data: [
      { value: 23960 },
      { value: 24100 },
      { value: 23850 },
      { value: 24200 },
      { value: 24050 },
      { value: 24350 },
      { value: 24500 },
      { value: 24400 },
      { value: 24650 },
      { value: 24801 }
    ]
  },
  '1Y': {
    balance: '$24,801.32',
    change: '$8,401.32 (51.2%)',
    data: [
      { value: 16400 },
      { value: 15200 },
      { value: 17100 },
      { value: 16800 },
      { value: 18500 },
      { value: 19200 },
      { value: 18000 },
      { value: 20100 },
      { value: 21500 },
      { value: 19800 },
      { value: 22400 },
      { value: 23100 },
      { value: 21800 },
      { value: 24200 },
      { value: 24801 }
    ]
  },
  ALL: {
    balance: '$24,801.32',
    change: '$19,801.32 (396%)',
    data: [
      { value: 5000 },
      { value: 6200 },
      { value: 5800 },
      { value: 7500 },
      { value: 9200 },
      { value: 8400 },
      { value: 11000 },
      { value: 12800 },
      { value: 14500 },
      { value: 13200 },
      { value: 16800 },
      { value: 18500 },
      { value: 20100 },
      { value: 22400 },
      { value: 24801 }
    ]
  }
}

export function Portfolio() {
  const [range, setRange] = useState<Key>('1M')
  const fallback = portfolioDataByRange['1M']!
  const active = portfolioDataByRange[range as string] ?? fallback

  return (
    <Card className="w-[520px] rounded-2xl">
      <Card.Header className="flex-row items-start justify-between pb-0">
        <div className="flex flex-col gap-3">
          <Card.Title className="text-base">Portfolio</Card.Title>
          <div className="flex flex-col gap-0.5">
            <span className="text-muted text-xs">Total balance</span>
            <span className="text-foreground text-2xl font-semibold">
              {active.balance}
            </span>
            <span className="text-xs font-medium text-green-500">
              {active.change}
            </span>
          </div>
        </div>
        <Segment defaultSelectedKey="1M" size="sm" onSelectionChange={setRange}>
          <Segment.Item id="1H">1H</Segment.Item>
          <Segment.Item id="1D">1D</Segment.Item>
          <Segment.Item id="1W">1W</Segment.Item>
          <Segment.Item id="1M">1M</Segment.Item>
          <Segment.Item id="1Y">1Y</Segment.Item>
          <Segment.Item id="ALL">ALL</Segment.Item>
        </Segment>
      </Card.Header>
      <Card.Content>
        <LineChart
          data={active.data}
          height={182}
          margin={{ bottom: 0, left: 0, right: 0, top: 4 }}>
          <LineChart.YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
          <LineChart.Line
            dataKey="value"
            dot={false}
            stroke="var(--chart-3)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </Card.Content>
    </Card>
  )
}
