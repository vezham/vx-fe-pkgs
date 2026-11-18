import { notFound } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'

import { layoutDemos } from '@src/demos/react/layouts'

const examples = Object.fromEntries(
  Object.entries(layoutDemos).map(([name, entry]) => [
    name,
    lazy(async () => ({ default: await entry.loader() }))
  ])
)

export const assertLayoutExample = (name: string) => {
  if (!Object.prototype.hasOwnProperty.call(layoutDemos, name)) throw notFound()
}

export const LayoutExample = ({ name }: { name: string }) => {
  assertLayoutExample(name)
  const Example = examples[name]

  return (
    <Suspense fallback={<p role="status">Loading layout example…</p>}>
      <Example />
    </Suspense>
  )
}
