import { assignVehicleData } from './data'
import type { AssignResponse, RQAssign } from './types'

const Assign = {
  list: async (_rq: RQAssign): Promise<AssignResponse> => {
    void _rq

    return Promise.resolve(assignVehicleData)
  }
}

export { Assign }
