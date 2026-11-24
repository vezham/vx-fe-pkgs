// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue } from '@vezham/react-pro-v3'

export function Percent() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-6">
      <NumberValue
        className="text-foreground text-2xl font-semibold"
        maximumFractionDigits={1}
        style="percent"
        value={0.033}
      />
      <NumberValue
        className="text-foreground text-2xl font-semibold"
        maximumFractionDigits={1}
        style="percent"
        value={0.985}
      />
      <NumberValue
        className="text-foreground text-2xl font-semibold"
        signDisplay="exceptZero"
        style="percent"
        value={-0.021}
      />
    </div>
  )
}
