// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { Map } from '@vezham/react-pro-v3/map'
import { Card } from '@vezham/react-v3'

import { mapStyles, mapWorkerUrl } from './map-styles'

const priorityRoute: [number, number][] = [
  [-122.3476, 47.6205],
  [-122.34763, 47.61974],
  [-122.34762, 47.61926],
  [-122.34762, 47.61858],
  [-122.3462, 47.61857],
  [-122.34566, 47.61857],
  [-122.34516, 47.61857],
  [-122.34404, 47.61856],
  [-122.34341, 47.61856],
  [-122.34263, 47.61856],
  [-122.34216, 47.61855],
  [-122.34146, 47.61851],
  [-122.34109, 47.61836],
  [-122.34054, 47.61806],
  [-122.33983, 47.61765],
  [-122.33889, 47.6171],
  [-122.33831, 47.61676],
  [-122.33806, 47.61637],
  [-122.33796, 47.61585],
  [-122.33785, 47.6153],
  [-122.33745, 47.61506],
  [-122.33628, 47.61436],
  [-122.3356, 47.61389],
  [-122.33512, 47.61351],
  [-122.33378, 47.61207],
  [-122.33323, 47.61167],
  [-122.33235, 47.61204],
  [-122.33208, 47.61198],
  [-122.33121, 47.61097],
  [-122.32998, 47.60955],
  [-122.32972, 47.6093],
  [-122.3289, 47.6084],
  [-122.32839, 47.60786],
  [-122.32788, 47.60731],
  [-122.32717, 47.60653],
  [-122.32626, 47.60691],
  [-122.32597, 47.60703],
  [-122.32505, 47.60741],
  [-122.32555, 47.60811],
  [-122.32461, 47.60857],
  [-122.32396, 47.60884],
  [-122.32226, 47.60957],
  [-122.32115, 47.61003],
  [-122.32081, 47.61012],
  [-122.32081, 47.61092],
  [-122.32082, 47.61126],
  [-122.32081, 47.61191],
  [-122.32081, 47.61271],
  [-122.32082, 47.61306],
  [-122.32083, 47.61385],
  [-122.32078, 47.61409],
  [-122.31958, 47.61409],
  [-122.31948, 47.61493],
  [-122.31941, 47.61523],
  [-122.31829, 47.61527],
  [-122.31751, 47.61528],
  [-122.31685, 47.61527],
  [-122.31687, 47.61637],
  [-122.31688, 47.61711],
  [-122.31689, 47.61767],
  [-122.31692, 47.61987],
  [-122.31692, 47.62095],
  [-122.31678, 47.62146],
  [-122.31675, 47.62307],
  [-122.31675, 47.62427],
  [-122.31561, 47.62427],
  [-122.31464, 47.62426],
  [-122.3141, 47.62426]
]

const vehicles = [
  {
    color: '#4285f4',
    driver: 'Maya',
    eta: '6 min',
    latitude: 47.6205,
    longitude: -122.3477,
    status: 'En route',
    unit: 'Bike 14'
  },
  {
    color: '#22c55e',
    driver: 'Noah',
    eta: 'Ready',
    latitude: 47.6112,
    longitude: -122.3314,
    status: 'At pickup',
    unit: 'Van 03'
  },
  {
    color: '#f97316',
    driver: 'Iris',
    eta: '11 min',
    latitude: 47.624,
    longitude: -122.3141,
    status: 'Rerouting',
    unit: 'Bike 22'
  }
]

const initialVehicle = vehicles[0]!

export function FleetDispatch() {
  const [selectedVehicle, setSelectedVehicle] = useState<
    (typeof vehicles)[number] | null
  >(initialVehicle)

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-122.342, 47.628]}
        pitch={32}
        styles={mapStyles}
        workerUrl={mapWorkerUrl}
        zoom={13}>
        <Map.Route
          color="#4285f4"
          coordinates={priorityRoute}
          opacity={0.78}
          width={4}
        />

        {vehicles.map(vehicle => (
          <Map.Marker
            key={vehicle.unit}
            latitude={vehicle.latitude}
            longitude={vehicle.longitude}
            onClick={() => setSelectedVehicle(vehicle)}>
            <Map.MarkerContent>
              <Map.MarkerDot color={vehicle.color} />
              <Map.MarkerLabel>{vehicle.unit}</Map.MarkerLabel>
            </Map.MarkerContent>
            <Map.MarkerTooltip>
              <span className="font-medium">{vehicle.driver}</span>
              <span className="text-background/70 ml-1">{vehicle.status}</span>
            </Map.MarkerTooltip>
          </Map.Marker>
        ))}

        {selectedVehicle ? (
          <Map.Popup
            closeButton
            closeOnClick={false}
            focusAfterOpen={false}
            latitude={selectedVehicle.latitude}
            longitude={selectedVehicle.longitude}
            offset={18}
            onClose={() => setSelectedVehicle(null)}>
            <div className="space-y-1 pr-4 text-xs">
              <p className="font-medium">{selectedVehicle.unit}</p>
              <p className="text-muted">{selectedVehicle.driver}</p>
              <p className="text-muted">
                {selectedVehicle.status} · {selectedVehicle.eta}
              </p>
            </div>
          </Map.Popup>
        ) : null}

        <Map.Controls>
          <Map.ZoomControl />
          <Map.CompassControl />
          <Map.FullscreenControl />
        </Map.Controls>
      </Map>

      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[230px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">Fleet dispatch</Card.Title>
          <Card.Description>Seattle central zone</Card.Description>
        </Card.Header>
        <Card.Content className="grid grid-cols-3 gap-3 text-xs">
          <span>
            <strong className="text-foreground block text-base">18</strong>
            Active
          </span>
          <span>
            <strong className="text-foreground block text-base">92%</strong>
            SLA
          </span>
          <span>
            <strong className="text-foreground block text-base">4</strong>
            Holds
          </span>
        </Card.Content>
      </Card>
    </div>
  )
}
