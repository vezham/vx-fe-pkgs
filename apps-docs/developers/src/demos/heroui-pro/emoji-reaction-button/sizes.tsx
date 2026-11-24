// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { EmojiReactionButton } from '@vezham/react-pro-v3'

export function Sizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex items-center gap-3">
          <span className="text-muted w-8 text-xs font-medium">{size}</span>
          <div className="flex items-center gap-2">
            <EmojiReactionButton isSelected size={size}>
              <EmojiReactionButton.Emoji>👍</EmojiReactionButton.Emoji>
              <EmojiReactionButton.Count>5</EmojiReactionButton.Count>
            </EmojiReactionButton>
            <EmojiReactionButton size={size}>
              <EmojiReactionButton.Emoji>😂</EmojiReactionButton.Emoji>
              <EmojiReactionButton.Count>2</EmojiReactionButton.Count>
            </EmojiReactionButton>
            <EmojiReactionButton size={size}>
              <EmojiReactionButton.Emoji>🎉</EmojiReactionButton.Emoji>
              <EmojiReactionButton.Count>1</EmojiReactionButton.Count>
            </EmojiReactionButton>
          </div>
        </div>
      ))}
    </div>
  )
}
