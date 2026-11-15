'use client'

import { type CSSProperties, useSyncExternalStore } from 'react'

import { EmptyState, Typography, buttonVariants } from '@vezham/react-v3'

const getNotFoundImageSrc = (version: string, theme: 'light' | 'dark') =>
  `https://static.cdn.vezham.com/assets/illustrations/404-red-${theme}.svg?vx=${encodeURIComponent(version)}`

const getPathname = () => window.location.pathname || '/'
const getServerPathname = () => ''
const subscribeToPathname = (onPathnameChange: () => void) => {
  window.addEventListener('popstate', onPathnameChange)

  return () => window.removeEventListener('popstate', onPathnameChange)
}

type Props = {
  app?: string
  version?: string
  homeUrl?: string
}

export const NotFound = ({ app = 'Vx', homeUrl = '/', version }: Props) => {
  const pathname = useSyncExternalStore(
    // vx-bot/INFO: Recheck on Back/Forward navigation via popstate.
    subscribeToPathname,
    // vx-bot/INFO: Read the browser pathname as the client snapshot.
    getPathname,
    // vx-bot/NOTE: Return '' during SSR and initial hydration to keep them consistent.
    getServerPathname
  )

  return (
    <main className="vx-not-found flex min-h-screen items-center justify-center p-6 text-left">
      <EmptyState className="w-full max-w-148 items-start gap-0 p-2 text-left">
        <div className="vx-not-found__content flex w-full max-w-144 flex-col items-start justify-center gap-3">
          {version ? (
            <div
              aria-hidden="true"
              className="vx-not-found__image mb-3 aspect-[654/300] w-[min(20rem,70vw)] max-w-full [background-image:var(--vx-not-found-image-light)] bg-contain bg-center bg-no-repeat landscape:w-[min(14rem,30vw)] dark:[background-image:var(--vx-not-found-image-dark)]"
              style={
                {
                  '--vx-not-found-image-light': `url("${getNotFoundImageSrc(version, 'light')}")`,
                  '--vx-not-found-image-dark': `url("${getNotFoundImageSrc(version, 'dark')}")`
                } as CSSProperties
              }
            />
          ) : null}
          <Typography.Heading
            className="vx-not-found__title text-3xl"
            level={1}>
            Page not found
          </Typography.Heading>
          <Typography.Paragraph
            className="vx-not-found__description"
            color="muted">
            {app} could not find the page you requested
            <span
              className="vx-not-found__path font-semibold wrap-anywhere"
              data-vx-not-found-path>
              {pathname ? `: ${pathname}` : null}
            </span>
            .
          </Typography.Paragraph>
          <a
            className={`vx-not-found__home ${buttonVariants({ variant: 'secondary' })}`}
            href={homeUrl}>
            Back to Home
          </a>
        </div>
      </EmptyState>
    </main>
  )
}
