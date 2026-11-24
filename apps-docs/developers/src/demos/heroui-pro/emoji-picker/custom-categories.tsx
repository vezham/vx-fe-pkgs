// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Magnifier } from '@gravity-ui/icons'
import emojisList from 'emojibase-data/en/compact.json'
import { useMemo, useRef, useState } from 'react'

import { EMOJI_SKIN_TONES, EmojiPicker } from '@vezham/react-pro-v3'
import {
  Button,
  EmptyState,
  ScrollShadow,
  SearchField,
  Tooltip
} from '@vezham/react-v3'

type Emoji = (typeof emojisList)[0]
const emojis: Emoji[] = emojisList.filter(
  e => typeof e.label === 'string' && !e.label.startsWith('regional indicator')
)

const CATEGORY_GROUP_MAP: Record<string, number> = {
  activities: 6,
  'animals-nature': 3,
  flags: 9,
  'food-drink': 4,
  objects: 7,
  'people-body': 1,
  'smileys-emotion': 0,
  symbols: 8,
  'travel-places': 5
}

const CUSTOM_CATEGORIES = [
  {
    emoji: (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m6-2h.01M15 10h.01" />
          <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
        </g>
      </svg>
    ),
    id: 'smileys-emotion',
    label: 'Smileys & Emotion'
  },
  {
    emoji: (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2">
          <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-6.5v-2a1.5 1.5 0 1 1 3 0V12m0-6.5a1.5 1.5 0 0 1 3 0V12" />
          <path d="M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7L7 19q-.468-.718-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.87 1.87 0 0 1 2.28.28L8 13" />
        </g>
      </svg>
    ),
    id: 'people-body',
    label: 'People & Body'
  },
  {
    emoji: (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2">
          <path d="M11 5h2m6 7q-1 8-5 8h-4q-4 0-5-8" />
          <path d="M11 16q0 1 1 1c1 0 1-.333 1-1zm1 2v2m-2-9v.01m4-.01v.01M5 4l6 .97l-6.238 6.688a1.02 1.02 0 0 1-1.41.111a.95.95 0 0 1-.327-.954zm14 0l-6 .97l6.238 6.688c.358.408.989.458 1.41.111a.95.95 0 0 0 .327-.954z" />
        </g>
      </svg>
    ),
    id: 'animals-nature',
    label: 'Animals & Nature'
  },
  {
    emoji: (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2">
          <path d="M4 16.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0M14 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
          <path d="M9 13c.366-2 1.866-3.873 4.5-5.6M17 15c-1.333-2.333-2.333-5.333-1-9" />
          <path d="M5 6q5.5-4 11 0q-5.5 4-11 0" />
        </g>
      </svg>
    ),
    id: 'food-drink',
    label: 'Food & Drink'
  },
  {
    emoji: (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
          <path d="M6 5.3a9 9 0 0 1 0 13.4M18 5.3a9 9 0 0 0 0 13.4" />
        </g>
      </svg>
    ),
    id: 'activities',
    label: 'Activities'
  },
  {
    emoji: (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2">
          <path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
          <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0H9m-6-6h15m-6 0V6" />
        </g>
      </svg>
    ),
    id: 'travel-places',
    label: 'Travel & Places'
  },
  {
    emoji: (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 12h1m8-9v1m8 8h1M5.6 5.6l.7.7m12.1-.7l-.7.7M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0-1 3a2 2 0 0 1-4 0a3.5 3.5 0 0 0-1-3m.7 1h4.6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
    id: 'objects',
    label: 'Objects'
  },
  {
    emoji: (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
          <path d="M14.401 8c-.669-.628-1.5-1-2.401-1c-2.21 0-4 2.239-4 5s1.79 5 4 5c.9 0 1.731-.372 2.4-1M7 10.5h4m-4 3h4" />
        </g>
      </svg>
    ),
    id: 'symbols',
    label: 'Symbols'
  },
  {
    emoji: (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1-7 0a5 5 0 0 0-7 0zm0 16v-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
    id: 'flags',
    label: 'Flags'
  }
] as const

function CustomCategoriesContent() {
  const [skinTone, setSkinTone] = useState('default')
  const gridRef = useRef<HTMLDivElement>(null)

  const displayEmojis = useMemo(() => {
    const skinIndex = EMOJI_SKIN_TONES.findIndex(t => t.id === skinTone) - 1

    if (skinIndex < 0) return emojis

    return emojis.map(emoji => {
      const skin = emoji.skins?.[skinIndex]

      if (!skin) return emoji

      return { ...emoji, unicode: skin.unicode }
    })
  }, [skinTone])

  const categoryStartIndices = useMemo(() => {
    const indices: Record<string, number> = {}

    for (const [categoryId, groupNum] of Object.entries(CATEGORY_GROUP_MAP)) {
      const idx = displayEmojis.findIndex(e => e.group === groupNum)

      if (idx !== -1) indices[categoryId] = idx
    }

    return indices
  }, [displayEmojis])

  const scrollToCategory = (categoryId: string) => {
    const grid = gridRef.current

    if (!grid) return
    const index = categoryStartIndices[categoryId]

    if (index === undefined) return
    const itemSize = 38
    const itemsPerRow = Math.floor(grid.clientWidth / itemSize)
    const scrollTop = Math.floor(index / itemsPerRow) * itemSize

    grid.scrollTo({ behavior: 'smooth', top: scrollTop })
  }

  return (
    <>
      <SearchField autoFocus aria-label="Search emoji" variant="secondary">
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search emoji..." />
          <EmojiPicker.SkinTonePicker value={skinTone} onChange={setSkinTone}>
            <EmojiPicker.SkinToneTrigger className="mr-1" />
            <EmojiPicker.SkinToneContent>
              {EMOJI_SKIN_TONES.map(tone => (
                <EmojiPicker.SkinToneOption
                  key={tone.id}
                  aria-label={tone.label}
                  id={tone.id}>
                  {tone.emoji}
                </EmojiPicker.SkinToneOption>
              ))}
            </EmojiPicker.SkinToneContent>
          </EmojiPicker.SkinTonePicker>
        </SearchField.Group>
      </SearchField>
      <EmojiPicker.Grid
        ref={gridRef}
        items={displayEmojis}
        renderEmptyState={() => (
          <EmptyState className="flex h-full min-h-20 flex-1 flex-col items-center justify-center gap-2">
            <Magnifier className="text-muted size-5" />
            No emoji found.
          </EmptyState>
        )}>
        {item => (
          <EmojiPicker.Item
            id={String(item.unicode)}
            textValue={`${item.label || ''} ${Array.isArray(item.tags) ? item.tags.join(' ') : ''}`}>
            {item.unicode}
          </EmojiPicker.Item>
        )}
      </EmojiPicker.Grid>
      <EmojiPicker.Footer>
        <ScrollShadow hideScrollBar orientation="horizontal">
          <div className="flex items-center gap-1 overflow-visible px-2 py-0.5 pr-3">
            {CUSTOM_CATEGORIES.map(({ emoji, id, label }) => (
              <Tooltip key={id} delay={0}>
                <Button
                  excludeFromTabOrder
                  isIconOnly
                  aria-label={label}
                  className="hover:bg-muted/20 flex size-6 shrink-0 items-center justify-center rounded-full rounded-md"
                  variant="ghost"
                  onPress={() => scrollToCategory(id)}>
                  <span className="text-base" tabIndex={-1}>
                    {emoji}
                  </span>
                </Button>
                <Tooltip.Content placement="top">
                  <p>{label}</p>
                </Tooltip.Content>
              </Tooltip>
            ))}
          </div>
        </ScrollShadow>
      </EmojiPicker.Footer>
    </>
  )
}

export function CustomCategories() {
  return (
    <EmojiPicker aria-label="Emoji" defaultValue="😀">
      <EmojiPicker.Trigger className="text-xl">
        <EmojiPicker.Value />
      </EmojiPicker.Trigger>
      <EmojiPicker.Popover>
        <EmojiPicker.Content>
          <CustomCategoriesContent />
        </EmojiPicker.Content>
      </EmojiPicker.Popover>
    </EmojiPicker>
  )
}
