import type { Ref } from 'react'

import type { TamizhiChatProps } from './chat'
import { Conversation } from './conversation'
import { Welcome } from './welcome'
import { EmbedWelcome } from './welcome-embed'

interface Props {
  chat: TamizhiChatProps['chat']
  variant: 'app' | 'embed'
  avatarSlotRef: Ref<HTMLDivElement>
  isAnimated: boolean
  isOffline: boolean
  onSelectProfile: (id: string) => void
  onRetry: () => void
  onSpeak?: (text: string) => void
}

export const ChatContent = ({
  chat,
  variant,
  avatarSlotRef,
  isAnimated,
  isOffline,
  onSelectProfile,
  onRetry,
  onSpeak
}: Props) => {
  if (chat.messages.length > 0)
    return (
      <Conversation
        messages={chat.messages}
        isStreaming={chat.isStreaming}
        isAnimated={isAnimated}
        isOffline={isOffline}
        actions={{
          onRetry,
          onToggleTask: chat.toggleTask,
          onRate: chat.rate,
          onSpeak,
          onBranch: chat.branchChat
        }}
      />
    )
  return variant === 'embed' ? (
    <EmbedWelcome profile={chat.profile} avatarSlotRef={avatarSlotRef} />
  ) : (
    <Welcome
      profile={chat.profile}
      profiles={chat.profiles}
      avatarSlotRef={avatarSlotRef}
      onSelect={onSelectProfile}
    />
  )
}
