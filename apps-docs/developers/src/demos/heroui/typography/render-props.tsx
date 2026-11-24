// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Typography } from '@vezham/react-v3'

export const RenderProps = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography
        render={({ children, ...domProps }) => (
          <h2 {...domProps}>{children}</h2>
        )}
        type="h1">
        H1 visual style, h2 semantic element
      </Typography>
      <Typography
        render={({ children, ...domProps }) => (
          <span {...domProps}>{children}</span>
        )}>
        The render prop can swap the underlying element while preserving HeroUI
        props and styles.
      </Typography>
    </div>
  )
}
