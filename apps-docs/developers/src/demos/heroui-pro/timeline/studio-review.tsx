// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Timeline } from '@vezham/react-pro-v3'
import { Avatar, Card, Chip, Link } from '@vezham/react-v3'

const avatars = {
  blue: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
  green:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
  orange:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg'
} as const

const productImage =
  'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/2.jpeg'

const reviewEvents = [
  {
    author: 'Mina Sol',
    avatar: avatars.blue,
    meta: '10:18 AM',
    status: 'current',
    title: 'Product asset uploaded',
    type: 'asset'
  },
  {
    author: 'Orin Vale',
    avatar: avatars.orange,
    body: 'The side profile reads clearly on the landing page. Keep the outsole shadow soft so the sole texture stays visible.',
    meta: '10:27 AM',
    status: 'warning',
    title: 'Lighting pass reviewed',
    type: 'note'
  },
  {
    author: 'Paz Kim',
    avatar: avatars.green,
    body: 'Updated the launch tile copy and aligned the product badge with the approved campaign language.',
    meta: '10:43 AM',
    status: 'default',
    title: 'Copy note resolved',
    type: 'note'
  },
  {
    author: 'Mina Sol',
    avatar: avatars.blue,
    body: 'Exported the square crop, PDP detail view, and marketplace thumbnail for final QA.',
    meta: '11:06 AM',
    status: 'success',
    title: 'Review package ready',
    type: 'note'
  }
] as const

export function StudioReview() {
  return (
    <div className="w-full max-w-[620px] min-w-0">
      <div className="mb-4">
        <p className="text-muted m-0 text-xs font-medium">Studio review</p>
        <h3 className="text-foreground m-0 text-base font-semibold">
          Runner launch assets
        </h3>
      </div>

      <Timeline density="compact" size="sm">
        {reviewEvents.map(event => (
          <Timeline.Item key={event.title} align="center" status={event.status}>
            <Timeline.Marker
              aria-hidden="true"
              className="size-6 overflow-hidden border-0 p-0 shadow-none">
              <Avatar className="size-full" size="sm">
                <Avatar.Image alt="" src={event.avatar} />
                <Avatar.Fallback>
                  {event.author
                    .split(' ')
                    .map(part => part[0])
                    .join('')}
                </Avatar.Fallback>
              </Avatar>
            </Timeline.Marker>
            <Timeline.Content className="gap-2">
              <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h3 className="text-foreground m-0 text-xs leading-5 font-medium">
                    {event.title}
                  </h3>
                  {event.type === 'asset' ? (
                    <Chip color="accent" size="sm" variant="soft">
                      Review
                    </Chip>
                  ) : null}
                </div>
                <div className="text-muted flex shrink-0 items-center gap-2 text-xs leading-5">
                  <span>{event.author}</span>
                  <time>{event.meta}</time>
                </div>
              </div>

              {event.type === 'asset' ? (
                <Card
                  className="!border-border w-full overflow-hidden !border !border-solid p-0"
                  variant="transparent">
                  <div className="grid min-w-0 gap-0 sm:grid-cols-[140px_minmax(0,1fr)]">
                    <img
                      alt="Side profile of the runner product asset"
                      className="aspect-[4/3] w-full object-cover select-none sm:aspect-auto sm:h-full"
                      draggable={false}
                      src={productImage}
                    />
                    <div className="flex min-w-0 flex-col gap-3 p-3">
                      <p className="text-muted m-0 text-xs leading-5">
                        Final hero crop is ready for retouch review with the
                        side profile, lace detail, and marketplace thumbnail
                        queued.
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip size="sm" variant="secondary">
                          PDP hero
                        </Chip>
                        <Chip size="sm" variant="secondary">
                          4 crops
                        </Chip>
                        <Link className="text-xs" href="#">
                          Open board
                          <Link.Icon />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <p className="text-muted m-0 text-xs leading-5">{event.body}</p>
              )}
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}
