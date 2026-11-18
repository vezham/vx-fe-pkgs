import { useState } from 'react'

import { Button } from '@vezham/react-v3'

type Props = { name: string; title: string }

const viewports = [
  { label: 'Fit', width: undefined },
  { label: 'Mobile', width: 375 },
  { label: 'Tablet', width: 768 },
  { label: 'Desktop', width: 1280 }
]

export const LayoutFrame = ({ name, title }: Props) => {
  const [width, setWidth] = useState<number>()
  const src = `/examples/${name}`

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
        <div role="group" aria-label="Preview viewport" className="flex gap-1">
          {viewports.map(viewport => (
            <Button
              key={viewport.label}
              size="sm"
              variant={width === viewport.width ? 'secondary' : 'tertiary'}
              aria-pressed={width === viewport.width}
              onPress={() => setWidth(viewport.width)}>
              {viewport.label}
            </Button>
          ))}
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="text-muted hover:text-foreground text-sm underline underline-offset-4">
          Open example
        </a>
      </div>
      <div className="w-full overflow-x-auto">
        <iframe
          title={title}
          src={src}
          className="bg-background block h-140 border-0"
          style={{ width: width ?? '100%' }}
        />
      </div>
    </div>
  )
}
