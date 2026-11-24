// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Paperclip } from '@gravity-ui/icons'
import { useState } from 'react'

import { Button, Spinner } from '@vezham/react-v3'

export function LoadingState() {
  const [isLoading, setLoading] = useState(false)

  const handlePress = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Button isPending={isLoading} onPress={handlePress}>
      {({ isPending }) => (
        <>
          {isPending ? <Spinner color="current" size="sm" /> : <Paperclip />}
          {isPending ? 'Uploading...' : 'Upload File'}
        </>
      )}
    </Button>
  )
}
