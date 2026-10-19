import type {
  OperationStatus,
  PersonValue
} from '@pages/operations/_shared/types'

export type RQAssign = Record<string, never>

export type AssignItem = {
  id: string
  createdAt: string
  displayId: string
  routeName: string
  pickupPoint: string
  vehicle: number
  driver: PersonValue
  status: OperationStatus
}

export type AssignResponse = AssignItem[]
