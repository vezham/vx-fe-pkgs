// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useEffect, useState } from 'react'

import { Map } from '@vezham/react-pro-v3/map'
import { Avatar, Card } from '@vezham/react-v3'

import { mapStyles, mapWorkerUrl } from './map-styles'

const TRIP_DURATION_MS = 45000
const TRIP_MINUTES = 9

const route: [number, number][] = [
  [-122.3937, 37.7955],
  [-122.3963, 37.7935],
  [-122.4008, 37.79],
  [-122.4055, 37.7862],
  [-122.4102, 37.7825],
  [-122.4148, 37.7788],
  [-122.4195, 37.7751],
  [-122.4216, 37.7724],
  [-122.4213, 37.7692],
  [-122.4211, 37.7659],
  [-122.4208, 37.7626],
  [-122.4206, 37.7593],
  [-122.4204, 37.7561]
]

const destination = route[route.length - 1]!

const segmentLengths = route
  .slice(1)
  .map((point, index) =>
    Math.hypot(point[0] - route[index]![0], point[1] - route[index]![1])
  )
const totalLength = segmentLengths.reduce((sum, length) => sum + length, 0)

function locateAlongRoute(progress: number): {
  index: number
  point: [number, number]
} {
  let remaining = progress * totalLength

  for (let index = 0; index < segmentLengths.length; index++) {
    const length = segmentLengths[index]!

    if (remaining <= length) {
      const fraction = length === 0 ? 0 : remaining / length
      const [x1, y1] = route[index]!
      const [x2, y2] = route[index + 1]!

      return {
        index,
        point: [x1 + (x2 - x1) * fraction, y1 + (y2 - y1) * fraction]
      }
    }

    remaining -= length
  }

  return { index: route.length - 2, point: destination }
}

export function LiveTracking() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame: number
    let start: number | null = null

    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      setProgress(((timestamp - start) % TRIP_DURATION_MS) / TRIP_DURATION_MS)
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(frame)
  }, [])

  const { index, point } = locateAlongRoute(progress)
  const completedPath: [number, number][] = [
    ...route.slice(0, index + 1),
    point
  ]
  const etaMinutes = Math.max(1, Math.ceil((1 - progress) * TRIP_MINUTES))

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-122.4085, 37.776]}
        pitch={30}
        styles={mapStyles}
        workerUrl={mapWorkerUrl}
        zoom={13.1}>
        <Map.Route
          color="#94a3b8"
          coordinates={route}
          dashArray={[1.5, 1.5]}
          opacity={0.6}
          width={3}
        />
        <Map.Route
          color="#4285f4"
          coordinates={completedPath}
          opacity={0.9}
          width={4}
        />

        <Map.Marker latitude={point[1]} longitude={point[0]}>
          <Map.MarkerContent>
            <Map.MarkerDot color="#4285f4" />
            <Map.MarkerLabel>Courier</Map.MarkerLabel>
          </Map.MarkerContent>
        </Map.Marker>

        <Map.Marker latitude={destination[1]} longitude={destination[0]}>
          <Map.MarkerContent>
            <Map.MarkerDot color="#22c55e" />
            <Map.MarkerLabel>Drop-off</Map.MarkerLabel>
          </Map.MarkerContent>
        </Map.Marker>

        <Map.Controls>
          <Map.ZoomControl />
          <Map.CompassControl />
        </Map.Controls>
      </Map>

      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[250px] gap-3 p-4">
        <Card.Header className="flex-row items-center gap-3">
          <Avatar size="sm">
            <Avatar.Image
              alt="Noah the courier"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
            />
            <Avatar.Fallback>NO</Avatar.Fallback>
          </Avatar>
          <div className="min-w-0">
            <Card.Title className="text-sm">Noah is on the way</Card.Title>
            <Card.Description>Order #4128 · 2 items</Card.Description>
          </div>
        </Card.Header>
        <Card.Content className="gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Estimated arrival</span>
            <span className="font-semibold">{etaMinutes} min</span>
          </div>
          <div className="bg-surface-tertiary h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-[#4285f4] transition-[width] duration-150 ease-linear"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
