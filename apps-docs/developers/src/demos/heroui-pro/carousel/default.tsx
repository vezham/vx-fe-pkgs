// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Carousel } from '@vezham/react-pro-v3/carousel'

const images = [
  {
    alt: 'Sneakers front view',
    src: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/1.jpeg'
  },
  {
    alt: 'Sneakers side view',
    src: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/2.jpeg'
  },
  {
    alt: 'Sneakers back view',
    src: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/3.jpeg'
  },
  {
    alt: 'Sneakers top view',
    src: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/4.jpeg'
  },
  {
    alt: 'Sneakers detail view',
    src: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/5.jpeg'
  },
  {
    alt: 'Sneakers sole view',
    src: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/6.jpeg'
  }
]

export function Default() {
  return (
    <div className="w-full max-w-sm">
      <Carousel opts={{ loop: true }}>
        <Carousel.Content>
          {images.map((image, i) => (
            <Carousel.Item key={i}>
              <div className="overflow-hidden rounded-3xl">
                <img
                  alt={image.alt}
                  className="aspect-[1/1] w-full object-cover select-none"
                  draggable={false}
                  src={image.src}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
        <Carousel.Dots />
        <Carousel.Thumbnails>
          {images.map((image, i) => (
            <Carousel.Thumbnail
              key={i}
              alt={image.alt}
              index={i}
              src={image.src}
            />
          ))}
        </Carousel.Thumbnails>
      </Carousel>
    </div>
  )
}
