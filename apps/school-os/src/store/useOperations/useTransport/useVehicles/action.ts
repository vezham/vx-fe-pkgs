import { vehiclesData } from './data'
import type { RQVehicles, VehiclesResponse } from './types'

const Vehicles = {
  list: async (_rq: RQVehicles): Promise<VehiclesResponse> => {
    void _rq

    return Promise.resolve(vehiclesData)
  }
}

export { Vehicles }
