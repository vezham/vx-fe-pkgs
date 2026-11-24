// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { TextShimmer } from '@vezham/react-pro-v3'

export function Default() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <TextShimmer>Thinking...</TextShimmer>
      <TextShimmer>Generating response...</TextShimmer>
    </div>
  )
}
