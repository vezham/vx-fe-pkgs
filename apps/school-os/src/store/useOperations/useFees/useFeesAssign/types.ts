export type RQFeesAssign = Record<string, never>

export type FeesAssignItem = {
  id: string
  createdAt: string
  serialNo: string
  feesGroup: string
  feesType: string
  className: string
  section: string
  amount: number
  gender: string
  category: string
}

export type FeesAssignResponse = FeesAssignItem[]
