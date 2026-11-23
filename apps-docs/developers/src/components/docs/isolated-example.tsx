import { notFound } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'

import { isolatedDemos } from '@src/demos/react/isolated'

const examples = Object.fromEntries(
  Object.entries(isolatedDemos).map(([name, entry]) => [
    name,
    lazy(async () => ({ default: await entry.loader() }))
  ])
)

export const assertIsolatedExample = (name: string) => {
  if (!Object.prototype.hasOwnProperty.call(isolatedDemos, name))
    throw notFound()
}

export const IsolatedExample = ({ name }: { name: string }) => {
  assertIsolatedExample(name)
  const Example = examples[name]

  return (
    <Suspense fallback={<p role="status">Loading example…</p>}>
      <Example />
    </Suspense>
  )
}
