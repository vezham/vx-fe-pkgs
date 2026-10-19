export type RQFeesType = Record<string, never>

export type FeesTypeItem = {
  id: string
  createdAt: string
  displayId: string
  feesType: string
  feesCode: string
  feesGroup: string
  description: string
  status: 'Active' | 'Inactive'
}

export type FeesTypeResponse = FeesTypeItem[]
