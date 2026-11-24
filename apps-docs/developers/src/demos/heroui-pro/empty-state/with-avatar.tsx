// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { EmptyState } from '@vezham/react-pro-v3'
import { Avatar, Badge, Button } from '@vezham/react-v3'

export function WithAvatar() {
  return (
    <div className="w-[420px]">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Media>
            <Badge.Anchor>
              <Avatar className="size-12">
                <Avatar.Image
                  alt="John Doe"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <Badge
                className="right-1 bottom-0.5 size-3 min-h-3 min-w-3"
                color="danger"
                placement="bottom-right"
                size="sm"
              />
            </Badge.Anchor>
          </EmptyState.Media>
          <EmptyState.Title>User Offline</EmptyState.Title>
          <EmptyState.Description>
            This user is currently offline. You can leave a message to notify
            them or try again later.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content>
          <Button size="md" variant="secondary">
            Leave Message
          </Button>
        </EmptyState.Content>
      </EmptyState>
    </div>
  )
}
