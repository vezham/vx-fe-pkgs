// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { Map } from '@vezham/react-pro-v3/map'
import { Card } from '@vezham/react-v3'

import { mapStyles, mapWorkerUrl } from './map-styles'

const stores = [
  {
    address: 'NW 13th Ave',
    color: '#4285f4',
    distance: '0.8 mi',
    latitude: 45.5265,
    longitude: -122.6842,
    name: 'Pearl pickup',
    orders: '31 ready',
    status: 'Open'
  },
  {
    address: 'SW 3rd Ave',
    color: '#22c55e',
    distance: '1.6 mi',
    latitude: 45.5181,
    longitude: -122.6765,
    name: 'Downtown desk',
    orders: '18 ready',
    status: 'Open'
  },
  {
    address: 'SE Hawthorne',
    color: '#f97316',
    distance: '2.4 mi',
    latitude: 45.5128,
    longitude: -122.6538,
    name: 'Hawthorne hub',
    orders: 'Queue full',
    status: 'Busy'
  },
  {
    address: 'NE Alberta',
    color: '#8b5cf6',
    distance: '3.1 mi',
    latitude: 45.5591,
    longitude: -122.6467,
    name: 'Alberta counter',
    orders: '9 ready',
    status: 'Open'
  }
]

const initialStore = stores[0]!

export function StoreLocator() {
  const [selectedStore, setSelectedStore] = useState<
    (typeof stores)[number] | null
  >(initialStore)

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-122.678, 45.538]}
        pitch={18}
        styles={mapStyles}
        workerUrl={mapWorkerUrl}
        zoom={12.25}>
        {stores.map(store => (
          <Map.Marker
            key={store.name}
            latitude={store.latitude}
            longitude={store.longitude}
            onClick={() => setSelectedStore(store)}>
            <Map.MarkerContent>
              <Map.MarkerDot color={store.color} />
              <Map.MarkerLabel>{store.name}</Map.MarkerLabel>
            </Map.MarkerContent>
            <Map.MarkerTooltip>
              <span className="font-medium">{store.name}</span>
              <span className="text-background/70 ml-1">{store.orders}</span>
            </Map.MarkerTooltip>
          </Map.Marker>
        ))}

        {selectedStore ? (
          <Map.Popup
            closeButton
            closeOnClick={false}
            focusAfterOpen={false}
            latitude={selectedStore.latitude}
            longitude={selectedStore.longitude}
            offset={18}
            onClose={() => setSelectedStore(null)}>
            <div className="space-y-1 pr-4 text-xs">
              <p className="font-medium">{selectedStore.name}</p>
              <p className="text-muted">{selectedStore.address}</p>
              <p className="text-muted">
                {selectedStore.status} · {selectedStore.orders}
              </p>
            </div>
          </Map.Popup>
        ) : null}

        <Map.Controls>
          <Map.ZoomControl />
          <Map.LocateControl />
        </Map.Controls>
      </Map>

      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[240px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">Pickup network</Card.Title>
          <Card.Description>4 locations near Portland</Card.Description>
        </Card.Header>
        <Card.Content className="gap-2">
          {stores.slice(0, 3).map(store => (
            <button
              key={store.name}
              className="hover:bg-surface-tertiary flex items-center justify-between rounded-md px-2 py-1 text-left transition"
              type="button"
              onClick={() => setSelectedStore(store)}>
              <span className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: store.color }}
                />
                <span className="text-xs font-medium">{store.name}</span>
              </span>
              <span className="text-muted text-xs">{store.distance}</span>
            </button>
          ))}
        </Card.Content>
      </Card>
    </div>
  )
}
