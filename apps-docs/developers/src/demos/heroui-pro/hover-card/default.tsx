// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { HoverCard } from '@vezham/react-pro-v3'
import { Avatar, Link } from '@vezham/react-v3'

export function Default() {
  return (
    <div className="px-10 py-24">
      <p className="text-sm leading-8">
        Check out{' '}
        <HoverCard>
          <HoverCard.Trigger>
            <Link
              className="underline"
              href="https://x.com/hero_ui"
              target="_blank">
              @hero_ui
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Content>
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
        </HoverCard>{' '}
        for beautiful React components.
      </p>
    </div>
  )
}
