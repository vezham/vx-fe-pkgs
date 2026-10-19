export type RQFeesMaster = Record<string, never>

export type FeesMasterItem = {
  id: string
  createdAt: string
  displayId: string
  feesGroup: string
  feesType: string
  dueDate: string
  amount: number
  fineType: 'None' | 'Percentage' | 'Fixed'
  fineAmount: number
  status: 'Active' | 'Inactive'
}

export type FeesMasterResponse = FeesMasterItem[]
