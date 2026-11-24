// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import React from 'react'

import { Input } from '@vezham/react-v3'

export function Controlled() {
  const [value, setValue] = React.useState('heroui.com')

  return (
    <div className="flex w-80 flex-col gap-2">
      <Input
        aria-label="Domain"
        placeholder="domain"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <span className="text-muted px-1 text-sm">
        https://{value || 'your-domain'}
      </span>
    </div>
  )
}
