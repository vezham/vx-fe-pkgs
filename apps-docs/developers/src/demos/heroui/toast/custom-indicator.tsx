// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Star } from '@gravity-ui/icons'

import { Button, toast } from '@vezham/react-v3'

export function CustomIndicator() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Button
        size="sm"
        variant="secondary"
        onPress={() =>
          toast('Custom icon indicator', {
            indicator: <Star />
          })
        }>
        Custom indicator
      </Button>
    </div>
  )
}
