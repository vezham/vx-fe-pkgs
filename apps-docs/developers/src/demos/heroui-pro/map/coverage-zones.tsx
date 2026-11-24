// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useEffect } from 'react'

import { Map, useMap } from '@vezham/react-pro-v3/map'
import { Card } from '@vezham/react-v3'

import { mapStyles, mapWorkerUrl } from './map-styles'

const SOURCE_ID = 'coverage-zones-source'
const FILL_LAYER_ID = 'coverage-zones-fill'
const LINE_LAYER_ID = 'coverage-zones-line'

type CoverageZoneProperties = {
  fill: string
  name: string
  stroke: string
  volume: string
}

const coverageZones: GeoJSON.FeatureCollection<
  GeoJSON.Polygon,
  CoverageZoneProperties
> = {
  features: [
    {
      geometry: {
        coordinates: [
          [
            [-97.764, 30.295],
            [-97.735, 30.3],
            [-97.723, 30.276],
            [-97.752, 30.267],
            [-97.773, 30.277],
            [-97.764, 30.295]
          ]
        ],
        type: 'Polygon'
      },
      properties: {
        fill: '#4285f4',
        name: 'North same-day',
        stroke: '#2563eb',
        volume: '84% covered'
      },
      type: 'Feature'
    },
    {
      geometry: {
        coordinates: [
          [
            [-97.752, 30.267],
            [-97.723, 30.276],
            [-97.714, 30.247],
            [-97.744, 30.238],
            [-97.769, 30.25],
            [-97.752, 30.267]
          ]
        ],
        type: 'Polygon'
      },
      properties: {
        fill: '#22c55e',
        name: 'Core express',
        stroke: '#16a34a',
        volume: '96% covered'
      },
      type: 'Feature'
    },
    {
      geometry: {
        coordinates: [
          [
            [-97.769, 30.25],
            [-97.744, 30.238],
            [-97.734, 30.212],
            [-97.771, 30.207],
            [-97.792, 30.226],
            [-97.769, 30.25]
          ]
        ],
        type: 'Polygon'
      },
      properties: {
        fill: '#f97316',
        name: 'South scheduled',
        stroke: '#ea580c',
        volume: '71% covered'
      },
      type: 'Feature'
    }
  ],
  type: 'FeatureCollection'
}

const zoneLabels = [
  {
    color: '#4285f4',
    latitude: 30.284,
    longitude: -97.748,
    name: 'North same-day',
    volume: '84%'
  },
  {
    color: '#22c55e',
    latitude: 30.255,
    longitude: -97.738,
    name: 'Core express',
    volume: '96%'
  },
  {
    color: '#f97316',
    latitude: 30.225,
    longitude: -97.766,
    name: 'South scheduled',
    volume: '71%'
  }
]

function getFirstSymbolLayer(
  map: NonNullable<ReturnType<typeof useMap>['map']>
) {
  return map.getStyle().layers?.find(layer => layer.type === 'symbol')?.id
}

function CoverageZoneLayer() {
  const { isLoaded, map } = useMap()

  useEffect(() => {
    if (!isLoaded || !map) return

    const addLayers = () => {
      if (map.getSource(SOURCE_ID)) return

      const beforeId = getFirstSymbolLayer(map)

      map.addSource(SOURCE_ID, {
        data: coverageZones,
        type: 'geojson'
      })
      map.addLayer(
        {
          id: FILL_LAYER_ID,
          paint: {
            'fill-color': ['get', 'fill'],
            'fill-opacity': 0.18
          },
          source: SOURCE_ID,
          type: 'fill'
        },
        beforeId
      )
      map.addLayer(
        {
          id: LINE_LAYER_ID,
          paint: {
            'line-color': ['get', 'stroke'],
            'line-opacity': 0.9,
            'line-width': 2
          },
          source: SOURCE_ID,
          type: 'line'
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
      if (map.getLayer(LINE_LAYER_ID)) map.removeLayer(LINE_LAYER_ID)
      if (map.getLayer(FILL_LAYER_ID)) map.removeLayer(FILL_LAYER_ID)
      if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID)
    }
  }, [isLoaded, map])

  return null
}

export function CoverageZones() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-97.748, 30.254]}
        pitch={18}
        styles={mapStyles}
        workerUrl={mapWorkerUrl}
        zoom={10.9}>
        <CoverageZoneLayer />

        {zoneLabels.map(zone => (
          <Map.Marker
            key={zone.name}
            latitude={zone.latitude}
            longitude={zone.longitude}>
            <Map.MarkerContent>
              <Map.MarkerDot color={zone.color} />
              <Map.MarkerLabel>{zone.volume}</Map.MarkerLabel>
            </Map.MarkerContent>
            <Map.MarkerTooltip>
              <span className="font-medium">{zone.name}</span>
              <span className="text-background/70 ml-1">
                {zone.volume} covered
              </span>
            </Map.MarkerTooltip>
          </Map.Marker>
        ))}

        <Map.Controls>
          <Map.ZoomControl />
          <Map.CompassControl />
        </Map.Controls>
      </Map>

      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[240px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">Coverage zones</Card.Title>
          <Card.Description>Austin delivery capacity</Card.Description>
        </Card.Header>
        <Card.Content className="gap-2">
          {zoneLabels.map(zone => (
            <div
              key={zone.name}
              className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: zone.color }}
                />
                {zone.name}
              </span>
              <span className="text-muted">{zone.volume}</span>
            </div>
          ))}
        </Card.Content>
      </Card>
    </div>
  )
}
