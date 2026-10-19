import type {
  OperationStatus,
  PersonValue
} from '@pages/operations/_shared/types'

export type RQVehicles = Record<string, never>

export type VehicleItem = {
  id: string
  createdAt: string
  displayId: string
  vehicleNo: string
  vehicleModel: string
  madeYear: number
  registrationNo: string
  chassisNo: string
  gpsDeviceId: string
  trackAction: string
  driver: PersonValue
  status: OperationStatus
}

export type VehiclesResponse = VehicleItem[]
