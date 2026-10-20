import type {
  OperationStatus,
  PersonValue
} from '@pages/operations/_shared/types'

export type RQVehicleDrivers = Record<string, never>

export type VehicleDriverItem = {
  id: string
  createdAt: string
  displayId: string
  driver: PersonValue
  phoneNumber: string
  licenseNo: string
  address: string
  status: OperationStatus
}

export type VehicleDriversResponse = VehicleDriverItem[]
