export type RQHostelList = Record<string, never>

export type HostelListItem = {
  id: string
  createdAt: string
  displayId: string
  hostelName: string
  hostelType: string
  address: string
  intake: number
  description: string
} & Record<string, unknown>

export type HostelListResponse = HostelListItem[]
