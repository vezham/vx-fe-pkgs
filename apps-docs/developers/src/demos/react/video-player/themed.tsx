import { useState } from 'react'

import { Button } from '@vezham/react-v3'
import { VideoPlayer } from '@vezham/react/components/video-player'

export const Themed = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div className="flex w-full max-w-lg flex-col items-start gap-4">
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Use {theme === 'light' ? 'dark' : 'light'} recording
      </Button>
      <VideoPlayer
        aria-label="Themed button demonstration"
        srcLight="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/components/videos/button-docs-light.mp4"
        srcDark="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/components/videos/button-docs-dark.mp4"
        theme={theme}
        autoPlay={false}
        muted
      />
    </div>
  )
}
