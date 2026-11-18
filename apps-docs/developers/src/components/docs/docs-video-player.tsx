import { useTheme } from '@vezham/docs-react/provider/base'
import {
  VideoPlayer,
  type VideoPlayerProps
} from '@vezham/react/components/video-player'

export type DocsVideoPlayerProps = Omit<VideoPlayerProps, 'theme'>

export const DocsVideoPlayer = ({
  src,
  srcLight,
  srcDark,
  ...props
}: DocsVideoPlayerProps) => {
  const { resolvedTheme } = useTheme()
  // vx-bot/NOTE: Both dark ScrollShadow recordings in upstream docs return 403.
  const darkSource = /\/(?:scroll|scoll)-shadow-docs-dark\.mp4(?:\.mp4)?$/.test(
    srcDark ?? ''
  )
    ? (srcLight ?? src)
    : srcDark

  return (
    <VideoPlayer
      aria-label="HeroUI component demonstration"
      {...props}
      src={src}
      srcLight={srcLight}
      srcDark={darkSource}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}
