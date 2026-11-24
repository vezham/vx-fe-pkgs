// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue } from '@vezham/react-pro-v3'

export function WithPrefixSuffix() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl p-6">
      <NumberValue
        className="text-foreground text-2xl font-semibold"
        maximumFractionDigits={0}
        value={228441}>
        <NumberValue.Suffix>
          <span className="text-muted ml-1 text-sm font-normal">revenue</span>
        </NumberValue.Suffix>
      </NumberValue>

      <NumberValue
        className="text-foreground text-2xl font-semibold"
        notation="compact"
        value={1234567}>
        <NumberValue.Suffix>
          <span className="text-muted ml-1 text-sm font-normal">users</span>
        </NumberValue.Suffix>
      </NumberValue>

      <NumberValue
        className="text-foreground text-2xl font-semibold"
        currency="USD"
        style="currency"
        value={99.99}>
        <NumberValue.Suffix>
          <span className="text-muted ml-1 text-sm font-normal">/month</span>
        </NumberValue.Suffix>
      </NumberValue>
    </div>
  )
}
