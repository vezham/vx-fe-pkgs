// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { EmojiReactionButton } from '@vezham/react-pro-v3'

export function Disabled() {
  return (
    <div className="flex items-center gap-2">
      <EmojiReactionButton isDisabled isSelected>
        <EmojiReactionButton.Emoji>❤️</EmojiReactionButton.Emoji>
        <EmojiReactionButton.Count>12</EmojiReactionButton.Count>
      </EmojiReactionButton>
      <EmojiReactionButton isDisabled>
        <EmojiReactionButton.Emoji>👍</EmojiReactionButton.Emoji>
        <EmojiReactionButton.Count>3</EmojiReactionButton.Count>
      </EmojiReactionButton>
    </div>
  )
}
