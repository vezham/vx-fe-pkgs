// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Default } from './default'

export function StickyHeader({
  allowsColumnResize = true,
  stickyHeader = true,
  variant = 'primary'
}: {
  allowsColumnResize?: boolean
  stickyHeader?: boolean
  variant?: 'primary' | 'secondary'
}) {
  return (
    <Default
      allowsColumnResize={allowsColumnResize}
      scrollContainerClassName="max-h-[320px]"
      stickyHeader={stickyHeader}
      variant={variant}
    />
  )
}
