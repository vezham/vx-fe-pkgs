import { useParams } from '@tanstack/react-router'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Link } from '@vezham/react-v3'

import { VideoPlayer, type VideoProps } from './video-player'

export { VideoPlayer } from './video-player'

type Props = ComponentProps<'img'> & {
  darkSrc?: string
  href?: string
  wrapperClassName?: string
  priority?: boolean
}

export const DocsImage = ({
  darkSrc,
  href,
  wrapperClassName,
  priority,
  src,
  alt,
  className,
  ...props
}: Props) => {
  const images = (
    <>
      <img
        {...props}
        src={src}
        alt={alt ?? ''}
        loading={priority ? 'eager' : 'lazy'}
        className={twMerge(
          'absolute inset-0 m-0 h-full w-full',
          darkSrc ? 'object-cover dark:hidden' : 'object-contain',
          className
        )}
      />
      {darkSrc && (
        <img
          {...props}
          src={darkSrc}
          alt={alt ?? ''}
          loading={priority ? 'eager' : 'lazy'}
          className={twMerge(
            'absolute inset-0 m-0 hidden h-full w-full object-cover dark:block',
            className
          )}
        />
      )}
    </>
  )
  const wrapper = twMerge(
    'not-prose relative my-6 block aspect-[2/1] w-full overflow-hidden rounded-xl border',
    wrapperClassName
  )
  return href ? (
    <Link href={href} className={wrapper}>
      {images}
    </Link>
  ) : (
    <div className={wrapper}>{images}</div>
  )
}

const nativeAppUrl = (slug = '') =>
  `https://heroui.com/docs/native-showcase/components/${slug}`

export const NativeVideoPlayerView = ({
  target,
  slug,
  href,
  linkLabel = 'Open in HeroUI Native',
  ...props
}: VideoProps & {
  target?: 'home' | 'component' | 'auto'
  slug?: string
  href?: string
  linkLabel?: string
}) => {
  const { _splat } = useParams({ strict: false })
  const component =
    target === 'home'
      ? ''
      : (slug ??
        (_splat?.startsWith('components/')
          ? _splat.split('/').slice(-1)[0]
          : ''))
  return (
    <div className="not-prose my-6 flex flex-col items-end gap-4">
      <Link
        href={href ?? nativeAppUrl(component)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground bg-default rounded-full px-3 py-1 text-sm no-underline">
        {linkLabel}
      </Link>
      <VideoPlayer {...props} />
    </div>
  )
}

export const NativeImageHeroView = ({
  href = nativeAppUrl(),
  linkLabel = 'Open in HeroUI Native'
}: {
  href?: string
  linkLabel?: string
}) => (
  <>
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {linkLabel}
    </Link>
    <DocsImage
      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/heroui-native-og-light-1.webp"
      darkSrc="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/heroui-native-og-dark-1.webp"
      alt="HeroUI Native Introduction"
    />
  </>
)

export const NativeTryOnDevice = () => (
  <div className="not-prose my-6 flex flex-wrap gap-4 rounded-xl border p-6">
    <Link href={nativeAppUrl()} target="_blank" rel="noopener noreferrer">
      Open in HeroUI Native
    </Link>
    <Link
      href="https://apps.apple.com/app/id6757860059"
      target="_blank"
      rel="noopener noreferrer">
      Download on the App Store
    </Link>
    <Link
      href="https://play.google.com/store/apps/details?id=com.herouinative.android"
      target="_blank"
      rel="noopener noreferrer">
      Get it on Google Play
    </Link>
  </div>
)
