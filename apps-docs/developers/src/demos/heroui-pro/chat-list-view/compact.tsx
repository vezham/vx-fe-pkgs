// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Comment } from '@gravity-ui/icons'

import { ChatListView } from '@vezham/react-pro-v3'

const THREADS = [
  {
    id: '1',
    preview: 'Can you help me draft a launch checklist?',
    title: 'Product launch planning',
    updatedAt: '2h ago'
  },
  {
    id: '2',
    preview: 'Summarize the customer feedback from last week.',
    title: 'Customer feedback review',
    updatedAt: 'Yesterday'
  },
  {
    id: '3',
    preview: 'Rewrite this paragraph to sound more concise.',
    title: 'Copy editing help',
    updatedAt: 'Mon'
  }
] as const

export function Default() {
  return (
    <div className="w-[480px]">
      <ChatListView aria-label="Recent chats" items={THREADS}>
        {thread => (
          <ChatListView.Item
            id={thread.id}
            textValue={`${thread.title} ${thread.preview}`}>
            <ChatListView.ItemContent>
              <ChatListView.Icon>
                <Comment />
              </ChatListView.Icon>
              <ChatListView.Text>
                <ChatListView.Title>{thread.title}</ChatListView.Title>
                <ChatListView.Preview>{thread.preview}</ChatListView.Preview>
              </ChatListView.Text>
              <ChatListView.Meta>{thread.updatedAt}</ChatListView.Meta>
            </ChatListView.ItemContent>
          </ChatListView.Item>
        )}
      </ChatListView>
    </div>
  )
}

export function Compact() {
  return (
    <div className="w-[280px]">
      <ChatListView aria-label="Recent chats" density="compact" items={THREADS}>
        {thread => (
          <ChatListView.Item id={thread.id} textValue={thread.title}>
            <ChatListView.ItemContent>
              <ChatListView.Icon>
                <Comment />
              </ChatListView.Icon>
              <ChatListView.Text>
                <ChatListView.Title>{thread.title}</ChatListView.Title>
                <ChatListView.Preview>{thread.preview}</ChatListView.Preview>
              </ChatListView.Text>
              <ChatListView.Meta>{thread.updatedAt}</ChatListView.Meta>
            </ChatListView.ItemContent>
          </ChatListView.Item>
        )}
      </ChatListView>
    </div>
  )
}
