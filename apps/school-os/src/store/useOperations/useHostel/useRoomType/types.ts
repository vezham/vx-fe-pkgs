export type RQRoomType = Record<string, never>

export type RoomTypeItem = {
  id: string
  createdAt: string
  displayId: string
  roomType: string
  description: string
}

export type RoomTypeResponse = RoomTypeItem[]
