import { useId } from 'react'

import { OUTFITS } from './avatar-data'
import type { Outfit } from './avatar-data'

interface Props {
  connection: string
  model: string
  lastOutfit?: Outfit
}
export const BrainSettings = ({ connection, model, lastOutfit }: Props) => {
  const headingId = useId()
  const lastPick = OUTFITS.find(item => item.id === lastOutfit)
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>Brain</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
        <dt>Connection</dt>
        <dd>{connection}</dd>
        <dt>Model</dt>
        <dd>{model}</dd>
        {lastPick && (
          <>
            <dt>Last pick</dt>
            <dd>{lastPick.label}</dd>
          </>
        )}
      </dl>
    </section>
  )
}
