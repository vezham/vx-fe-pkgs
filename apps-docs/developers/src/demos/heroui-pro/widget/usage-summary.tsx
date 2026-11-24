// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Widget } from '@vezham/react-pro-v3'
import { ProgressCircle, Table } from '@vezham/react-v3'

const usageData = [
  {
    amount: '33.1K',
    color: 'default' as const,
    label: 'Total API Requests',
    progress: 33
  },
  {
    amount: '98.2M',
    color: 'accent' as const,
    label: 'Input Tokens',
    progress: 62
  },
  {
    amount: '59M',
    color: 'accent' as const,
    label: 'Output Tokens',
    progress: 37
  },
  {
    amount: '$149.61',
    color: 'accent' as const,
    label: 'Total Spend',
    progress: 75
  }
]

export function UsageSummary() {
  return (
    <Widget className="w-full max-w-[520px]">
      <div className="grid grid-cols-[5fr_2fr] items-center px-5 py-2">
        <span className="text-muted text-xs font-medium">Usage Type</span>
        <span className="text-muted text-xs font-medium">Amount</span>
      </div>
      <Widget.Content className="flex flex-col gap-0 p-0">
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Usage summary">
              <Table.Header className="sr-only">
                <Table.Column isRowHeader className="bg-transparent">
                  Usage Type
                </Table.Column>
                <Table.Column className="bg-transparent">Amount</Table.Column>
              </Table.Header>
              <Table.Body>
                {usageData.map((item, idx) => (
                  <Table.Row
                    key={item.label}
                    className={
                      idx === usageData.length - 1 ? '[&_td]:border-b-0' : ''
                    }>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <ProgressCircle
                          aria-label={`${item.label} usage`}
                          color={item.color}
                          size="sm"
                          value={item.progress}>
                          <ProgressCircle.Track>
                            <ProgressCircle.TrackCircle />
                            <ProgressCircle.FillCircle />
                          </ProgressCircle.Track>
                        </ProgressCircle>
                        <span className="text-foreground text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-foreground text-sm font-semibold">
                        {item.amount}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Widget.Content>
    </Widget>
  )
}
