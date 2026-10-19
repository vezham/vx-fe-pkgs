export type RQCollectFees = Record<string, never>

export type CollectFeeStatus = 'Paid' | 'Unpaid'

export type CollectFeeStudent = {
  name: string
  subtitle?: string
  avatar?: string
}

export type CollectFeeItem = {
  id: string
  createdAt: string
  admissionNo: string
  rollNo: number
  student: CollectFeeStudent
  className: string
  section: string
  amount: number
  lastDate: string
  status: CollectFeeStatus
  paymentAction: string
}

export type CollectFeesResponse = CollectFeeItem[]
