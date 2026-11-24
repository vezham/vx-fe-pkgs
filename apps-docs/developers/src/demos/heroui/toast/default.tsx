// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Persons } from '@gravity-ui/icons'

import { Button, toast } from '@vezham/react-v3'

export function Default() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          const id = toast('You have been invited to join a team', {
            actionProps: {
              children: 'Dismiss',
              onPress: () => toast.close(id),
              variant: 'tertiary'
            },
            description: 'Bob sent you an invitation to join HeroUI team',
            indicator: <Persons />,
            variant: 'default'
          })
        }}>
        Show toast
      </Button>
    </div>
  )
}
