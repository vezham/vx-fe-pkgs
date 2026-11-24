// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Avatar, Button, Card } from '@vezham/react-v3'

export function PressableCards() {
  return (
    <div className="grid w-[500px] grid-cols-12 gap-4">
      <Card className="relative col-span-12 h-[220px] overflow-hidden">
        <PressableFeedback.Ripple className="z-1" />
        <img
          alt="NEO Home Robot"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo1.jpeg"
        />
        <Card.Header className="z-10">
          <Card.Title className="text-xs font-semibold tracking-wide text-black/70">
            NEO
          </Card.Title>
          <Card.Description className="text-sm leading-5 font-medium text-black/50">
            Home Robot
          </Card.Description>
        </Card.Header>
        <Card.Footer className="z-10 mt-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-black">Available soon</div>
            <div className="text-xs text-black/60">Get notified</div>
          </div>
          <Button className="bg-white text-black" size="sm" variant="tertiary">
            <PressableFeedback.Ripple />
            Notify me
          </Button>
        </Card.Footer>
      </Card>

      <Card className="col-span-6 cursor-pointer gap-2 overflow-hidden">
        <PressableFeedback.Ripple className="text-rose-200" />
        <Card.Header>
          <Avatar className="size-14 rounded-xl">
            <Avatar.Image
              alt="Indie Hackers"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
            />
            <Avatar.Fallback>IH</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className="mt-1">
          <p className="text-sm leading-4 font-medium">Indie Hackers</p>
          <p className="text-muted text-xs">148 members</p>
        </Card.Content>
        <Card.Footer className="flex items-center gap-2">
          <Avatar className="size-4">
            <Avatar.Image
              alt="John"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
            />
            <Avatar.Fallback>J</Avatar.Fallback>
          </Avatar>
          <p className="text-muted text-xs">By John</p>
        </Card.Footer>
      </Card>

      <Card className="col-span-6 cursor-pointer gap-2 overflow-hidden">
        <PressableFeedback.Ripple className="text-sky-300" />
        <Card.Header>
          <Avatar className="size-14 rounded-xl">
            <Avatar.Image
              alt="AI Builders"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
            />
            <Avatar.Fallback>AB</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className="mt-1">
          <p className="text-sm leading-4 font-medium">AI Builders</p>
          <p className="text-muted text-xs">362 members</p>
        </Card.Content>
        <Card.Footer className="flex items-center gap-2">
          <Avatar className="size-4">
            <Avatar.Image
              alt="Martha"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar>
          <p className="text-muted text-xs">By Martha</p>
        </Card.Footer>
      </Card>

      <Card
        className="col-span-12 flex cursor-pointer flex-row gap-3 overflow-hidden p-2"
        variant="transparent">
        <PressableFeedback.Highlight />
        <img
          alt="Futuristic Robot"
          className="aspect-square h-20 w-20 shrink-0 rounded-xl object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg"
        />
        <div className="flex flex-1 flex-col justify-center gap-1">
          <Card.Title className="text-sm">Bridging the Future</Card.Title>
          <Card.Description className="text-xs">
            Today, 6:30 PM
          </Card.Description>
        </div>
      </Card>

      <Card
        className="col-span-12 flex cursor-pointer flex-row gap-3 overflow-hidden p-2"
        variant="transparent">
        <PressableFeedback.Highlight />
        <img
          alt="Avocado Hackathon"
          className="aspect-square h-20 w-20 shrink-0 rounded-xl object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg"
        />
        <div className="flex flex-1 flex-col justify-center gap-1">
          <Card.Title className="text-sm">Avocado Hackathon</Card.Title>
          <Card.Description className="text-xs">Wed, 4:30 PM</Card.Description>
        </div>
      </Card>
    </div>
  )
}
