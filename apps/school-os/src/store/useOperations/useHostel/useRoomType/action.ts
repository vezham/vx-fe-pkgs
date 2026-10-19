import { roomTypeData } from './data'
import type { RQRoomType, RoomTypeResponse } from './types'

const RoomType = {
  list: async (_rq: RQRoomType): Promise<RoomTypeResponse> => {
    void _rq

    return Promise.resolve(roomTypeData)
  }
}

export { RoomType }
