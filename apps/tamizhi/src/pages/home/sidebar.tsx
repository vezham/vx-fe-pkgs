import type { AppNavigationItem } from '@vezham/react'
import type { Conversation } from '@vezham/tamizhi-contracts'
import { EXAMPLES } from '@vezham/tamizhi-ui'

export const getSidebarItems = (
  conversations: Conversation[]
): AppNavigationItem[] => [
  {
    key: 'new-chat',
    title: 'New chat',
    href: '/chat/new',
    icon: 'vx:plus'
  },
  ...conversations.map(chat => ({
    key: `chat-${chat.id}`,
    title: chat.title,
    href: `/chat/${chat.id}`,
    icon: 'vx:chat-round-dots'
  })),
  {
    key: 'examples',
    title: 'Examples',
    childrenDisplay: 'sidebar',
    children: EXAMPLES.map(example => ({
      key: `example-${example.id}`,
      title: example.title,
      href: `/chat/example-${example.id}`,
      icon: 'vx:chat-round-dots'
    }))
  }
]
