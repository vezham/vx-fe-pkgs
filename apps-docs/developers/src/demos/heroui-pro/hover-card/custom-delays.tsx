// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { HoverCard } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

function ImageCard() {
  return (
    <>
      <img
        alt="Neo Brutalism design"
        className="h-36 w-full rounded-t-2xl object-cover"
        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/heroui-pro-landing/chat-message.webp"
      />
      <div className="p-4">
        <p className="text-sm font-semibold">Neo Brutalism</p>
        <p className="text-muted mt-1 text-sm leading-relaxed">
          Raw aesthetics, bold colors, and playful typography.
        </p>
      </div>
    </>
  )
}

const delays = [
  { closeDelay: 0, label: 'Instant', openDelay: 0 },
  { closeDelay: 300, label: 'Default (700 / 300)', openDelay: 700 },
  { closeDelay: 500, label: 'Slow (1s / 500)', openDelay: 1000 }
]

export function CustomDelays() {
  return (
    <div className="flex items-center gap-6 px-10 py-24">
      {delays.map(({ closeDelay, label, openDelay }) => (
        <HoverCard key={label} closeDelay={closeDelay} openDelay={openDelay}>
          <HoverCard.Trigger>
            <Button variant="outline">{label}</Button>
          </HoverCard.Trigger>
          <HoverCard.Content className="w-72 p-0">
            <HoverCard.Arrow />
            <ImageCard />
          </HoverCard.Content>
        </HoverCard>
      ))}
    </div>
  )
}
