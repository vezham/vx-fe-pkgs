import { useEffect, useState } from 'react'

import { Button } from '@vezham/react-v3'
import type {
  TamizhiProfile,
  TamizhiSuggestion
} from '@vezham/tamizhi-contracts'

import { getTamizhiProfile } from './profiles'
import { sampleSuggestions } from './sample-suggestions'

const EMPTY_SUGGESTIONS: readonly TamizhiSuggestion[] = []

interface Props {
  variant?: 'app' | 'embed'
  profile: TamizhiProfile
  profiles: readonly TamizhiProfile[]
  onSuggest: (prompt: string) => void
  isDisabled: boolean
}

export const WelcomeSuggestions = ({
  variant = 'app',
  profile,
  profiles,
  onSuggest,
  isDisabled
}: Props) => {
  const suggestions =
    profile.suggestions ??
    getTamizhiProfile('vezham-tamizhi', profiles).suggestions ??
    EMPTY_SUGGESTIONS
  const limit = variant === 'embed' ? 2 : 3
  const [selection, setSelection] = useState<{
    profileId: string
    pool: readonly TamizhiSuggestion[]
    limit: number
    items: TamizhiSuggestion[]
  } | null>(null)
  useEffect(() => {
    // vx-bot/NOTE: Sample after hydration; keep the choice stable across draft and status updates.
    const timer = window.setTimeout(() => {
      setSelection({
        profileId: profile.id,
        pool: suggestions,
        limit,
        items: sampleSuggestions(suggestions, limit)
      })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [profile.id, suggestions, limit])
  const visibleSuggestions =
    selection?.profileId === profile.id &&
    selection.pool === suggestions &&
    selection.limit === limit
      ? selection.items
      : EMPTY_SUGGESTIONS
  if (visibleSuggestions.length === 0) return null
  return (
    <div
      role="group"
      aria-label={`Suggestions for ${profile.name}`}
      className={`mx-auto flex w-full max-w-4xl shrink-0 flex-wrap items-center justify-center gap-2 ${variant === 'embed' ? 'px-1 pb-2' : 'px-4 pb-3'}`}>
      {visibleSuggestions.map(suggestion => (
        <Button
          key={suggestion.title}
          size="sm"
          variant="outline"
          isDisabled={isDisabled}
          className="h-auto max-w-full rounded-full px-3 py-2 text-sm whitespace-normal"
          onPress={() => onSuggest(suggestion.prompt)}>
          {suggestion.title}
        </Button>
      ))}
    </div>
  )
}
