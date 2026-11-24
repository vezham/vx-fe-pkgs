// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { EmblaCarouselType } from 'embla-carousel'
import { useEffect, useState } from 'react'

import { Carousel } from '@vezham/react-pro-v3/carousel'
import { Card } from '@vezham/react-v3'

export function ApiAccess() {
  const [api, setApi] = useState<EmblaCarouselType>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- seed initial state from imperative Embla API
    setCount(api.scrollSnapList().length)

    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Carousel setApi={setApi}>
        <Carousel.Content>
          {Array.from({ length: 5 }, (_, i) => (
            <Carousel.Item key={i}>
              <div className="p-1">
                <Card className="select-none">
                  <Card.Content className="flex aspect-square items-center justify-center">
                    <span className="text-4xl font-semibold tabular-nums">
                      {i + 1}
                    </span>
                  </Card.Content>
                </Card>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
      <p className="text-muted text-center text-sm tabular-nums">
        Slide {current} of {count}
      </p>
    </div>
  )
}
