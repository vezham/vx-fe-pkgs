import { Button } from '@vezham/react-v3'
import type { TamizhiProfile } from '@vezham/tamizhi-contracts'

import { getTamizhiProfile } from './profiles'

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
    []
  const visibleSuggestions =
    variant === 'embed' ? suggestions.slice(0, 2) : suggestions
  if (suggestions.length === 0) return null
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
