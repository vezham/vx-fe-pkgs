// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Carousel } from '@vezham/react-pro-v3/carousel'
import { Card } from '@vezham/react-v3'

export function Loop() {
  return (
    <div className="w-full max-w-xs">
      <Carousel opts={{ loop: true }}>
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
    </div>
  )
}
