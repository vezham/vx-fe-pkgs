// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { CircleLayerSpecification } from 'maplibre-gl'
import { useMemo, useState } from 'react'

import { Map } from '@vezham/react-pro-v3/map'
import { Card } from '@vezham/react-v3'

import { mapStyles, mapWorkerUrl } from './map-styles'

type IncidentProperties = {
  assignee: string
  id: string
  service: string
  severity: 'critical' | 'warning' | 'info'
  status: string
  title: string
}

const incidents: Array<
  IncidentProperties & { latitude: number; longitude: number }
> = [
  {
    assignee: 'NOC',
    id: 'INC-2048',
    latitude: 40.758,
    longitude: -73.9855,
    service: 'Payments',
    severity: 'critical',
    status: 'Investigating',
    title: 'Checkout errors'
  },
  {
    assignee: 'Edge',
    id: 'INC-2049',
    latitude: 40.7505,
    longitude: -73.9934,
    service: 'CDN',
    severity: 'warning',
    status: 'Mitigating',
    title: 'Elevated latency'
  },
  {
    assignee: 'Data',
    id: 'INC-2050',
    latitude: 40.7306,
    longitude: -73.9866,
    service: 'Analytics',
    severity: 'info',
    status: 'Monitoring',
    title: 'Queue backlog'
  },
  {
    assignee: 'Ops',
    id: 'INC-2051',
    latitude: 40.7061,
    longitude: -74.0086,
    service: 'Auth',
    severity: 'warning',
    status: 'Assigned',
    title: 'Login retries'
  },
  {
    assignee: 'Mobile',
    id: 'INC-2052',
    latitude: 40.7182,
    longitude: -73.9571,
    service: 'Push',
    severity: 'info',
    status: 'Triaged',
    title: 'Notification delay'
  },
  {
    assignee: 'NOC',
    id: 'INC-2053',
    latitude: 40.6782,
    longitude: -73.9442,
    service: 'Search',
    severity: 'critical',
    status: 'Investigating',
    title: 'Index shard down'
  },
  {
    assignee: 'Infra',
    id: 'INC-2054',
    latitude: 40.7484,
    longitude: -73.956,
    service: 'Compute',
    severity: 'warning',
    status: 'Mitigating',
    title: 'Host pressure'
  },
  {
    assignee: 'Support',
    id: 'INC-2055',
    latitude: 40.7411,
    longitude: -74.0039,
    service: 'Tickets',
    severity: 'info',
    status: 'Monitoring',
    title: 'Webhook retries'
  },
  {
    assignee: 'Infra',
    id: 'INC-2056',
    latitude: 40.7128,
    longitude: -74.006,
    service: 'API',
    severity: 'critical',
    status: 'Paging',
    title: 'Error budget burn'
  },
  {
    assignee: 'Data',
    id: 'INC-2057',
    latitude: 40.7295,
    longitude: -74.0324,
    service: 'Warehouse',
    severity: 'warning',
    status: 'Assigned',
    title: 'Sync delayed'
  },
  {
    assignee: 'Edge',
    id: 'INC-2058',
    latitude: 40.6892,
    longitude: -74.0445,
    service: 'DNS',
    severity: 'info',
    status: 'Resolved',
    title: 'Failover complete'
  },
  {
    assignee: 'Mobile',
    id: 'INC-2059',
    latitude: 40.7516,
    longitude: -73.9755,
    service: 'App',
    severity: 'warning',
    status: 'Monitoring',
    title: 'Crash spike'
  }
]

const incidentColors = {
  critical: '#ef4444',
  info: '#4285f4',
  warning: '#f97316'
} satisfies Record<IncidentProperties['severity'], string>

const severityPointColor: NonNullable<
  CircleLayerSpecification['paint']
>['circle-color'] = [
  'match',
  ['get', 'severity'],
  'critical',
  incidentColors.critical,
  'warning',
  incidentColors.warning,
  'info',
  incidentColors.info,
  '#4285f4'
]

function createIncidentCollection(): GeoJSON.FeatureCollection<
  GeoJSON.Point,
  IncidentProperties
> {
  return {
    features: incidents.map(({ latitude, longitude, ...incident }) => ({
      geometry: {
        coordinates: [longitude, latitude],
        type: 'Point'
      },
      properties: incident,
      type: 'Feature'
    })),
    type: 'FeatureCollection'
  }
}

export function IncidentMonitor() {
  const [selectedIncident, setSelectedIncident] = useState<{
    coordinates: [number, number]
    properties: IncidentProperties
  } | null>(null)
  const incidentCollection = useMemo(createIncidentCollection, [])
  const criticalCount = incidents.filter(
    incident => incident.severity === 'critical'
  ).length
  const warningCount = incidents.filter(
    incident => incident.severity === 'warning'
  ).length

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-73.985, 40.728]}
        pitch={18}
        styles={mapStyles}
        workerUrl={mapWorkerUrl}
        zoom={10.7}>
        <Map.ClusterLayer<IncidentProperties>
          clusterColors={['#4285f4', '#f97316', '#ef4444']}
          clusterRadius={42}
          clusterThresholds={[4, 8]}
          data={incidentCollection}
          pointColor={severityPointColor}
          onPointClick={(feature, coordinates) => {
            setSelectedIncident({
              coordinates,
              properties: feature.properties
            })
          }}
        />

        {selectedIncident ? (
          <Map.Popup
            closeButton
            closeOnClick={false}
            focusAfterOpen={false}
            latitude={selectedIncident.coordinates[1]}
            longitude={selectedIncident.coordinates[0]}
            onClose={() => setSelectedIncident(null)}>
            <div className="space-y-2 pr-4 text-xs">
              <div>
                <p className="font-medium">
                  {selectedIncident.properties.title}
                </p>
                <p className="text-muted">{selectedIncident.properties.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <span>
                  <strong className="text-foreground block">Service</strong>
                  {selectedIncident.properties.service}
                </span>
                <span>
                  <strong className="text-foreground block">Owner</strong>
                  {selectedIncident.properties.assignee}
                </span>
              </div>
              <p className="text-muted">
                {selectedIncident.properties.severity} ·{' '}
                {selectedIncident.properties.status}
              </p>
            </div>
          </Map.Popup>
        ) : null}

        <Map.Controls>
          <Map.ZoomControl />
          <Map.FullscreenControl />
        </Map.Controls>
      </Map>

      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[250px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">Incident monitor</Card.Title>
          <Card.Description>New York operations</Card.Description>
        </Card.Header>
        <Card.Content className="gap-3">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <span>
              <strong className="text-foreground block text-base">
                {incidents.length}
              </strong>
              Open
            </span>
            <span>
              <strong className="text-foreground block text-base">
                {criticalCount}
              </strong>
              Critical
            </span>
            <span>
              <strong className="text-foreground block text-base">
                {warningCount}
              </strong>
              Warning
            </span>
          </div>
          <div className="space-y-1">
            {(['critical', 'warning', 'info'] as const).map(severity => (
              <div
                key={severity}
                className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 capitalize">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: incidentColors[severity] }}
                  />
                  {severity}
                </span>
                <span className="text-muted">
                  {
                    incidents.filter(incident => incident.severity === severity)
                      .length
                  }
                </span>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
