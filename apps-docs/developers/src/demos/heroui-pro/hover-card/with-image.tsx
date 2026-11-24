// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { HoverCard } from '@vezham/react-pro-v3'
import { Link } from '@vezham/react-v3'

export function WithImage() {
  return (
    <div className="px-10 py-24">
      <p className="text-sm leading-8">
        Learn more about the{' '}
        <HoverCard openDelay={0}>
          <HoverCard.Trigger>
            <Link
              className="underline"
              href="https://heroui.com"
              target="_blank">
              Neo Brutalism
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Content className="w-72 p-0">
            <HoverCard.Arrow />
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
          </HoverCard.Content>
        </HoverCard>{' '}
        design trend.
      </p>
    </div>
  )
}
