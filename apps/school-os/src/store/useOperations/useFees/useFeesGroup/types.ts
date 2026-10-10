export type RQFeesGroup = Record<string, never>

export type FeesGroupItem = {
  id: string
  createdAt: string
  displayId: string
  feesGroup: string
  description: string
  status: 'Active' | 'Inactive'
}

export type FeesGroupResponse = FeesGroupItem[]
