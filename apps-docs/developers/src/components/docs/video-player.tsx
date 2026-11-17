import {
  type ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore
} from 'react'
import { twMerge } from 'tailwind-merge'

import { useTheme } from '@vezham/docs-react/provider/base'
import {
  Pause,
  Play,
  Restart,
  VolumeCross,
  VolumeLoud
} from '@vezham/icons-react'
import { Button, Spinner, Tooltip } from '@vezham/react-v3'

export type VideoProps = Omit<ComponentProps<'video'>, 'height' | 'width'> & {
  srcLight?: string
  srcDark?: string
  height?: number
  width?: number
  playMode?: 'manual' | 'auto'
  onPlayingChange?: (playing: boolean) => void
}

const subscribeToPlaybackPreference = (notify: () => void) => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  motion.addEventListener('change', notify)
  return () => motion.removeEventListener('change', notify)
}
const allowsAutoplay = () =>
  !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const getVideoSource = (
  { src, srcLight, srcDark }: Pick<VideoProps, 'src' | 'srcLight' | 'srcDark'>,
  theme: string | undefined
) => {
  // vx-bot/NOTE: Both dark ScrollShadow recordings in upstream docs return 403.
  const darkSource = /\/(?:scroll|scoll)-shadow-docs-dark\.mp4(?:\.mp4)?$/.test(
    srcDark ?? ''
  )
    ? (srcLight ?? src)
    : srcDark
  return theme === 'dark'
    ? (darkSource ?? src ?? srcLight)
    : (src ?? srcLight ?? darkSource)
}

type VideoControlsProps = {
  playing: boolean
  isMuted: boolean
  togglePlayback: () => void
  toggleMute: () => void
  restart: () => void
}

const VideoControls = ({
  playing,
  isMuted,
  togglePlayback,
  toggleMute,
  restart
}: VideoControlsProps) => {
  const controlClass =
    'size-8 min-w-8 rounded-lg bg-black/15 text-white backdrop-blur-md'

  return (
    <>
      <Button
        aria-label="Toggle video playback"
        variant="tertiary"
        className="absolute inset-0 z-1 h-full w-full rounded-none bg-transparent hover:bg-transparent"
        onPress={togglePlayback}
      />
      <div
        role="group"
        aria-label="Video controls"
        className="absolute end-3 bottom-3 z-3 flex items-center gap-1">
        <Tooltip delay={500}>
          <Button
            isIconOnly
            aria-label={playing ? 'Pause' : 'Play'}
            size="sm"
            variant="tertiary"
            className={controlClass}
            onPress={togglePlayback}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <Tooltip.Content>{playing ? 'Pause' : 'Play'}</Tooltip.Content>
        </Tooltip>
        <Tooltip delay={500}>
          <Button
            isIconOnly
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            size="sm"
            variant="tertiary"
            className={controlClass}
            onPress={toggleMute}>
            {isMuted ? <VolumeCross size={16} /> : <VolumeLoud size={16} />}
          </Button>
          <Tooltip.Content>{isMuted ? 'Unmute' : 'Mute'}</Tooltip.Content>
        </Tooltip>
        <Tooltip delay={500}>
          <Button
            isIconOnly
            aria-label="Restart"
            size="sm"
            variant="tertiary"
            className={controlClass}
            onPress={restart}>
            <Restart size={16} />
          </Button>
          <Tooltip.Content>Restart</Tooltip.Content>
        </Tooltip>
      </div>
    </>
  )
}

export const VideoPlayer = ({
  src,
  srcLight,
  srcDark,
  height,
  width,
  muted = false,
  autoPlay = true,
  controls = false,
  loop = true,
  playMode = 'auto',
  className,
  style,
  onPlayingChange,
  onPlay,
  onPause,
  onVolumeChange,
  onLoadedData,
  onCanPlay,
  onWaiting,
  onError,
  onLoadStart,
  ...props
}: VideoProps) => {
  const { resolvedTheme } = useTheme()
  const source = getVideoSource({ src, srcLight, srcDark }, resolvedTheme)
  const video = useRef<HTMLVideoElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const autoplayAllowed = useSyncExternalStore(
    subscribeToPlaybackPreference,
    allowsAutoplay,
    () => false
  )

  const play = useCallback(async () => {
    const element = video.current
    if (!element) return
    try {
      await element.play()
    } catch (failure) {
      if (failure instanceof DOMException && failure.name === 'AbortError')
        return
      if (
        failure instanceof DOMException &&
        failure.name === 'NotAllowedError' &&
        !element.muted
      ) {
        element.muted = true
        setIsMuted(true)
        try {
          await element.play()
          return
        } catch (retryFailure) {
          if (
            retryFailure instanceof DOMException &&
            retryFailure.name === 'AbortError'
          )
            return
        }
      }
      setError('Video could not play. Try again.')
    }
  }, [])

  useEffect(() => {
    const element = frame.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    const loadObserver = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setNear(true)
          loadObserver.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        setVisible(!!entry?.isIntersecting)
      },
      { threshold: 0.5 }
    )
    loadObserver.observe(element)
    playObserver.observe(element)
    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!autoPlay || playMode !== 'auto' || !autoplayAllowed) return
    if (visible) void play()
    else video.current?.pause()
  }, [visible, autoPlay, playMode, autoplayAllowed, source, play])

  const togglePlayback = () => {
    if (video.current?.paused) void play()
    else video.current?.pause()
  }
  const toggleMute = () => {
    if (video.current) video.current.muted = !video.current.muted
  }
  const restart = () => {
    if (video.current) video.current.currentTime = 0
    void play()
  }
  const label = props['aria-label'] ?? 'HeroUI component demonstration'

  return (
    <div
      ref={frame}
      data-docs-video=""
      data-playing={playing}
      className={twMerge(
        'not-prose relative isolate aspect-video w-full overflow-hidden rounded-xl border',
        className
      )}
      style={style}>
      {/* vx-bot/NOTE: Upstream UI recordings do not include caption tracks. */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        {...props}
        ref={video}
        aria-label={label}
        src={source}
        height={height}
        width={width}
        className="absolute inset-0 h-full w-full object-cover"
        controls={controls}
        loop={loop}
        muted={isMuted}
        playsInline
        preload={near ? 'auto' : 'none'}
        onLoadStart={event => {
          setLoading(true)
          setError('')
          onLoadStart?.(event)
        }}
        onLoadedData={event => {
          setLoading(false)
          onLoadedData?.(event)
        }}
        onCanPlay={event => {
          setLoading(false)
          onCanPlay?.(event)
        }}
        onWaiting={event => {
          setLoading(true)
          onWaiting?.(event)
        }}
        onPlay={event => {
          setPlaying(true)
          setError('')
          onPlayingChange?.(true)
          onPlay?.(event)
        }}
        onPause={event => {
          setPlaying(false)
          onPlayingChange?.(false)
          onPause?.(event)
        }}
        onVolumeChange={event => {
          setIsMuted(event.currentTarget.muted)
          onVolumeChange?.(event)
        }}
        onError={event => {
          setLoading(false)
          setError('Video could not load. Try again.')
          onError?.(event)
        }}
      />
      {!controls && (
        <VideoControls
          playing={playing}
          isMuted={isMuted}
          togglePlayback={togglePlayback}
          toggleMute={toggleMute}
          restart={restart}
        />
      )}
      {near && loading && !error && (
        <Spinner
          aria-label="Loading video"
          className="pointer-events-none absolute start-1/2 top-1/2 z-2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
      {error && (
        <div
          role="alert"
          className="bg-background/90 absolute inset-0 z-4 flex flex-col items-center justify-center gap-3 p-4 text-center text-sm">
          <p>{error}</p>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              video.current?.load()
              void play()
            }}>
            Retry video
          </Button>
        </div>
      )}
    </div>
  )
}
