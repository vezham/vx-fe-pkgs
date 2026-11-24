// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { KPI } from '@vezham/react-pro-v3/kpi'

const revenueCards = [
  {
    change: '+33%',
    title: 'Total Revenue',
    trend: 'up' as const,
    value: 228451
  },
  {
    change: '+13.0%',
    title: 'Total Expenses',
    trend: 'down' as const,
    value: 71887
  },
  {
    change: '0.0%',
    title: 'Total Profit',
    trend: 'neutral' as const,
    value: 156540
  },
  { change: '+1.0%', title: 'New Customers', trend: 'up' as const, value: 1234 }
]

export function Default() {
  return (
    <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-4">
      {revenueCards.map(card => (
        <KPI key={card.title}>
          <KPI.Header>
            <KPI.Title>{card.title}</KPI.Title>
          </KPI.Header>
          <KPI.Content>
            <KPI.Value
              currency={card.title.includes('Customer') ? undefined : 'USD'}
              maximumFractionDigits={0}
              style={card.title.includes('Customer') ? 'decimal' : 'currency'}
              value={card.value}
            />
            <KPI.Trend trend={card.trend}>{card.change}</KPI.Trend>
          </KPI.Content>
        </KPI>
      ))}
    </div>
  )
}
