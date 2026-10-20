import { reasonsData } from './data'
import type { RQReasons, ReasonsResponse } from './types'

const Reasons = {
  list: async (_rq: RQReasons): Promise<ReasonsResponse> => {
    void _rq

    return Promise.resolve(reasonsData)
  }
}

export { Reasons }
