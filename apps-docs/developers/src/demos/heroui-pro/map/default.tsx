// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { Map } from '@vezham/react-pro-v3/map'
import { Card } from '@vezham/react-v3'

import { mapStyles, mapWorkerUrl } from './map-styles'

const dispatchRoute: [number, number][] = [
  [-122.39385, 37.79519],
  [-122.39412, 37.79548],
  [-122.39462, 37.79601],
  [-122.39475, 37.79603],
  [-122.39482, 37.79601],
  [-122.39483, 37.79588],
  [-122.39458, 37.79532],
  [-122.39435, 37.79502],
  [-122.39416, 37.79484],
  [-122.39367, 37.7945],
  [-122.3933, 37.79428],
  [-122.39325, 37.79425],
  [-122.39314, 37.79417],
  [-122.39271, 37.79382],
  [-122.39259, 37.7937],
  [-122.39225, 37.79339],
  [-122.39163, 37.79287],
  [-122.39134, 37.79255],
  [-122.39127, 37.79243],
  [-122.3911, 37.79204],
  [-122.39078, 37.79137],
  [-122.39051, 37.79105],
  [-122.39025, 37.79083],
  [-122.3899, 37.79056],
  [-122.38873, 37.78962],
  [-122.38853, 37.78939],
  [-122.38826, 37.78894],
  [-122.38803, 37.78805],
  [-122.38799, 37.78762],
  [-122.388, 37.78723],
  [-122.38802, 37.78699],
  [-122.38816, 37.78519],
  [-122.38819, 37.78489],
  [-122.38821, 37.78463],
  [-122.3884, 37.78232],
  [-122.38843, 37.78188],
  [-122.38846, 37.78135],
  [-122.38857, 37.78097],
  [-122.38886, 37.78059],
  [-122.38954, 37.78003],
  [-122.38978, 37.77985],
  [-122.39064, 37.77919],
  [-122.3908, 37.77907],
  [-122.39137, 37.77863],
  [-122.39186, 37.77823],
  [-122.39181, 37.77807],
  [-122.39161, 37.77791],
  [-122.39122, 37.7776],
  [-122.39107, 37.77749],
  [-122.39084, 37.77727],
  [-122.3907, 37.77716],
  [-122.39049, 37.77702],
  [-122.3901, 37.77652],
  [-122.39006, 37.77638],
  [-122.39003, 37.77614],
  [-122.38995, 37.77537],
  [-122.38995, 37.77468],
  [-122.38995, 37.77451],
  [-122.38995, 37.77443],
  [-122.38981, 37.77302],
  [-122.3898, 37.77286],
  [-122.38972, 37.77207],
  [-122.3897, 37.77181],
  [-122.38963, 37.77116],
  [-122.3896, 37.77076],
  [-122.38958, 37.77063],
  [-122.38945, 37.76919],
  [-122.38941, 37.76882],
  [-122.38919, 37.76884],
  [-122.38873, 37.76886],
  [-122.38779, 37.76892]
]

const stops = [
  {
    kind: 'start',
    label: 'Ferry Building',
    latitude: 37.79519,
    longitude: -122.39385,
    status: 'Pickup ready',
    time: '9:12 AM'
  },
  {
    kind: 'stop',
    label: 'Market Street',
    latitude: 37.7896,
    longitude: -122.3887,
    status: 'Next stop',
    time: '9:19 AM'
  },
  {
    kind: 'finish',
    label: 'Chase Center',
    latitude: 37.76892,
    longitude: -122.38779,
    status: 'Dropoff',
    time: '9:27 AM'
  }
]

const initialStop = stops[1]!

export function Default() {
  const [selectedStop, setSelectedStop] = useState<
    (typeof stops)[number] | null
  >(initialStop)

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-122.3927, 37.7816]}
        pitch={26}
        styles={mapStyles}
        workerUrl={mapWorkerUrl}
        zoom={13.25}>
        <Map.Route coordinates={dispatchRoute} />

        {stops.map(stop => (
          <Map.Marker
            key={stop.label}
            latitude={stop.latitude}
            longitude={stop.longitude}
            onClick={() => setSelectedStop(stop)}>
            <Map.MarkerContent>
              <Map.MarkerDot
                color={stop.kind === 'start' ? '#22c55e' : undefined}
                ringColor={stop.kind === 'start' ? '#bbf7d0' : undefined}
              />
              <Map.MarkerLabel>
                {stop.kind === 'start' ? 'Start' : stop.label}
              </Map.MarkerLabel>
            </Map.MarkerContent>
            <Map.MarkerTooltip>
              <span className="font-medium">{stop.label}</span>
              <span className="text-background/70 ml-1">{stop.time}</span>
            </Map.MarkerTooltip>
          </Map.Marker>
        ))}

        {selectedStop ? (
          <Map.Popup
            closeButton
            closeOnClick={false}
            focusAfterOpen={false}
            latitude={selectedStop.latitude}
            longitude={selectedStop.longitude}
            offset={18}
            onClose={() => setSelectedStop(null)}>
            <div className="space-y-1 pr-4 text-xs">
              <p className="font-medium">{selectedStop.label}</p>
              <p className="text-muted">{selectedStop.status}</p>
              <p className="text-muted">Arrival {selectedStop.time}</p>
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
          <Card.Title className="text-sm">Route planner</Card.Title>
          <Card.Description>Mission Bay dispatch</Card.Description>
        </Card.Header>
        <Card.Content className="grid grid-cols-3 gap-3 text-xs">
          <span>
            <strong className="text-foreground block text-base">7m</strong>
            ETA
          </span>
          <span>
            <strong className="text-foreground block text-base">3</strong>
            Stops
          </span>
          <span>
            <strong className="text-foreground block text-base">3.7</strong>
            Km
          </span>
        </Card.Content>
      </Card>
    </div>
  )
}
