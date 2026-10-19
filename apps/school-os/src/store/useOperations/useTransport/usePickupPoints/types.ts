export type RQPickupPoints = Record<string, never>

export type PickupPointItem = {
  id: string
  createdAt: string
  displayId: string
  pickupPoint: string
  status: 'Active' | 'Inactive'
  addedOn: string
}

export type PickupPointsResponse = PickupPointItem[]
