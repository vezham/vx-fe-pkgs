// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useEffect } from 'react'

import { Map, useMap } from '@vezham/react-pro-v3/map'
import { Card } from '@vezham/react-v3'

import { mapStyles, mapWorkerUrl } from './map-styles'

const SOURCE_ID = 'pickup-heatmap-source'
const HEATMAP_LAYER_ID = 'pickup-heatmap-layer'

const hotspots = [
  { intensity: 1, latitude: 40.758, longitude: -73.9855, name: 'Midtown' },
  { intensity: 0.9, latitude: 40.723, longitude: -74.0, name: 'SoHo' },
  {
    intensity: 0.75,
    latitude: 40.7265,
    longitude: -73.9815,
    name: 'East Village'
  },
  {
    intensity: 0.7,
    latitude: 40.7081,
    longitude: -73.9571,
    name: 'Williamsburg'
  },
  {
    intensity: 0.8,
    latitude: 40.7549,
    longitude: -73.9707,
    name: 'Midtown East'
  },
  { intensity: 0.55, latitude: 40.8116, longitude: -73.9465, name: 'Harlem' }
]

// Deterministic pseudo-random so the generated points are stable across renders.
function pseudoRandom(seed: number) {
  const value = Math.sin(seed) * 10000

  return value - Math.floor(value)
}

const pickupPoints: GeoJSON.FeatureCollection<
  GeoJSON.Point,
  { weight: number }
> = {
  features: hotspots.flatMap((hotspot, hotspotIndex) =>
    Array.from({ length: 36 }, (_, pointIndex) => {
      const seed = hotspotIndex * 100 + pointIndex
      const angle = pseudoRandom(seed) * Math.PI * 2
      const distance = pseudoRandom(seed + 0.5) * 0.016

      return {
        geometry: {
          coordinates: [
            hotspot.longitude + Math.cos(angle) * distance,
            hotspot.latitude + Math.sin(angle) * distance * 0.75
          ],
          type: 'Point' as const
        },
        properties: {
          weight: 0.3 + pseudoRandom(seed + 0.25) * 0.7 * hotspot.intensity
        },
        type: 'Feature' as const
      }
    })
  ),
  type: 'FeatureCollection'
}

function getFirstSymbolLayer(
  map: NonNullable<ReturnType<typeof useMap>['map']>
) {
  return map.getStyle().layers?.find(layer => layer.type === 'symbol')?.id
}

function PickupHeatmapLayer() {
  const { isLoaded, map } = useMap()

  useEffect(() => {
    if (!isLoaded || !map) return

    const addLayers = () => {
      if (map.getSource(SOURCE_ID)) return

      const beforeId = getFirstSymbolLayer(map)

      map.addSource(SOURCE_ID, {
        data: pickupPoints,
        type: 'geojson'
      })
      map.addLayer(
        {
          id: HEATMAP_LAYER_ID,
          paint: {
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(66, 133, 244, 0)',
              0.25,
              'rgba(66, 133, 244, 0.4)',
              0.5,
              'rgba(34, 197, 94, 0.55)',
              0.75,
              'rgba(249, 115, 22, 0.7)',
              1,
              'rgba(239, 68, 68, 0.85)'
            ],
            'heatmap-intensity': 0.9,
            'heatmap-opacity': 0.8,
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              10,
              18,
              14,
              40
            ],
            'heatmap-weight': ['get', 'weight']
          },
          source: SOURCE_ID,
          type: 'heatmap'
        },
        beforeId
      )
    }

    if (map.isStyleLoaded()) {
      addLayers()
    } else {
      map.once('idle', addLayers)
    }

    return () => {
      map.off('idle', addLayers)
      if (map.getLayer(HEATMAP_LAYER_ID)) map.removeLayer(HEATMAP_LAYER_ID)
      if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID)
    }
  }, [isLoaded, map])

  return null
}

export function Heatmap() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-73.975, 40.752]}
        styles={mapStyles}
        workerUrl={mapWorkerUrl}
        zoom={11.4}>
        <PickupHeatmapLayer />

        <Map.Controls>
          <Map.ZoomControl />
        </Map.Controls>
      </Map>

      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[240px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">Pickup demand</Card.Title>
          <Card.Description>New York · last hour</Card.Description>
        </Card.Header>
        <Card.Content className="gap-2">
          <div
            className="h-2 w-full rounded-full"
            style={{
              background:
                'linear-gradient(to right, rgba(66, 133, 244, 0.4), rgba(34, 197, 94, 0.55), rgba(249, 115, 22, 0.7), rgba(239, 68, 68, 0.85))'
            }}
          />
          <div className="text-muted flex items-center justify-between text-xs">
            <span>Low</span>
            <span>High</span>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
