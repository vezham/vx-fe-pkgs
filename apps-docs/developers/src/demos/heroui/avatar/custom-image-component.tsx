// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import type { ComponentProps } from 'react'

import { Avatar } from '@vezham/react-v3'

const Image = (props: ComponentProps<'img'>) => <img {...props} />

const SRC =
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg'

export function CustomImageComponent() {
  return (
    <Avatar>
      <Avatar.Image asChild height={40} src={SRC} width={40}>
        <Image alt="John Doe" src={SRC} />
      </Avatar.Image>
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  )
}
