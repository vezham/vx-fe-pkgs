export type RQHostelRoom = Record<string, never>

export type HostelRoomItem = {
  id: string
  createdAt: string
  displayId: string
  roomNo: string
  hostelName: string
  roomType: string
  bedCount: number
  costPerBed: string
} & Record<string, unknown>

export type HostelRoomResponse = HostelRoomItem[]
