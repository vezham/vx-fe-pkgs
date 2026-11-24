// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { Map } from '@vezham/react-pro-v3/map'
import { Card } from '@vezham/react-v3'

import { mapStyles, mapWorkerUrl } from './map-styles'

const properties = [
  {
    baths: 2,
    beds: 3,
    id: 'noe-valley',
    latitude: 37.7502,
    longitude: -122.4337,
    name: 'Noe Valley Victorian',
    neighborhood: 'Noe Valley',
    price: '$1.28m',
    sqft: '1,850'
  },
  {
    baths: 1,
    beds: 2,
    id: 'mission-loft',
    latitude: 37.7599,
    longitude: -122.4148,
    name: 'Mission District loft',
    neighborhood: 'Mission',
    price: '$895k',
    sqft: '1,120'
  },
  {
    baths: 2,
    beds: 2,
    id: 'hayes-valley',
    latitude: 37.7759,
    longitude: -122.4245,
    name: 'Hayes Valley condo',
    neighborhood: 'Hayes Valley',
    price: '$1.05m',
    sqft: '1,340'
  },
  {
    baths: 3,
    beds: 4,
    id: 'marina-view',
    latitude: 37.8021,
    longitude: -122.4382,
    name: 'Marina view home',
    neighborhood: 'Marina',
    price: '$2.4m',
    sqft: '2,600'
  },
  {
    baths: 1,
    beds: 1,
    id: 'soma-studio',
    latitude: 37.7785,
    longitude: -122.395,
    name: 'SoMa studio',
    neighborhood: 'SoMa',
    price: '$650k',
    sqft: '780'
  },
  {
    baths: 2,
    beds: 3,
    id: 'inner-sunset',
    latitude: 37.7644,
    longitude: -122.4692,
    name: 'Inner Sunset flat',
    neighborhood: 'Inner Sunset',
    price: '$1.12m',
    sqft: '1,540'
  }
]

const initialProperty = properties[1]!

export function PropertyListings() {
  const [selectedId, setSelectedId] = useState<string | null>(
    initialProperty.id
  )
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const selectedProperty =
    properties.find(property => property.id === selectedId) ?? null

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-122.431, 37.773]}
        styles={mapStyles}
        workerUrl={mapWorkerUrl}
        zoom={12}>
        {properties.map(property => {
          const isActive =
            property.id === selectedId || property.id === hoveredId

          return (
            <Map.Marker
              key={property.id}
              latitude={property.latitude}
              longitude={property.longitude}
              onClick={() => setSelectedId(property.id)}>
              <Map.MarkerContent>
                <span
                  className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-semibold shadow-md transition ${
                    isActive
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-overlay text-foreground'
                  }`}>
                  {property.price}
                </span>
              </Map.MarkerContent>
            </Map.Marker>
          )
        })}

        {selectedProperty ? (
          <Map.Popup
            closeButton
            closeOnClick={false}
            focusAfterOpen={false}
            latitude={selectedProperty.latitude}
            longitude={selectedProperty.longitude}
            offset={22}
            onClose={() => setSelectedId(null)}>
            <div className="space-y-1 pr-4 text-xs">
              <p className="font-medium">{selectedProperty.name}</p>
              <p className="text-muted">{selectedProperty.neighborhood}</p>
              <p className="text-muted">
                {selectedProperty.beds} bd · {selectedProperty.baths} ba ·{' '}
                {selectedProperty.sqft} sqft
              </p>
              <p className="text-foreground font-semibold">
                {selectedProperty.price}
              </p>
            </div>
          </Map.Popup>
        ) : null}

        <Map.Controls>
          <Map.ZoomControl />
        </Map.Controls>
      </Map>

      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[250px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">For sale</Card.Title>
          <Card.Description>
            {properties.length} homes in San Francisco
          </Card.Description>
        </Card.Header>
        <Card.Content className="gap-1">
          {properties.map(property => (
            <button
              key={property.id}
              type="button"
              className={`flex items-center justify-between rounded-md px-2 py-1.5 text-left transition ${
                property.id === selectedId
                  ? 'bg-surface-tertiary'
                  : 'hover:bg-surface-tertiary'
              }`}
              onClick={() => setSelectedId(property.id)}
              onMouseEnter={() => setHoveredId(property.id)}
              onMouseLeave={() => setHoveredId(null)}>
              <span className="min-w-0">
                <span className="block truncate text-xs font-medium">
                  {property.name}
                </span>
                <span className="text-muted block text-xs">
                  {property.beds} bd · {property.baths} ba
                </span>
              </span>
              <span className="text-xs font-semibold">{property.price}</span>
            </button>
          ))}
        </Card.Content>
      </Card>
    </div>
  )
}
