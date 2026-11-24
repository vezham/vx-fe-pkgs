// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { HoverCard } from '@vezham/react-pro-v3'
import { Avatar, Button, Link } from '@vezham/react-v3'

export function Controlled() {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="px-10 py-24">
      <div className="mb-4 flex items-center gap-2">
        <Button size="sm" variant="outline" onPress={() => setOpen(v => !v)}>
          {isOpen ? 'Close' : 'Open'} HoverCard
        </Button>
        <span className="text-[13px] opacity-60">
          State: <strong>{isOpen ? 'open' : 'closed'}</strong>
        </span>
      </div>
      <p className="text-sm leading-8">
        This card is controlled:{' '}
        <HoverCard open={isOpen} onOpenChange={setOpen}>
          <HoverCard.Trigger>
            <Link
              className="underline"
              href="https://x.com/hero_ui"
              target="_blank">
              @hero_ui
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <HoverCard.Arrow />
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <Avatar.Image
                  alt="HeroUI"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/heroui_isotipo.png"
                />
                <Avatar.Fallback>H</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col items-start justify-center">
                <span className="text-sm leading-4 font-semibold">HeroUI</span>
                <span className="text-muted text-sm tracking-tight">
                  @hero_ui
                </span>
              </div>
            </div>
            <p className="mt-3 pl-px text-sm font-medium">
              Building the future of UI for web & mobile.&nbsp;
              <span aria-label="confetti" role="img">
                🚀
              </span>
              &nbsp;(YC S24)&nbsp;
            </p>
            <div className="mt-3 flex gap-2">
              <div className="flex gap-1">
                <p className="text-sm font-semibold">4</p>
                <p className="text-muted text-sm">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-semibold">97.1K</p>
                <p className="text-muted text-sm">Followers</p>
              </div>
            </div>
          </HoverCard.Content>
        </HoverCard>
      </p>
    </div>
  )
}
