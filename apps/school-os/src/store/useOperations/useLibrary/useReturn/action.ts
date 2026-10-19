import { returnData } from './data'
import type { RQReturn, ReturnResponse } from './types'

const Return = {
  list: async (_rq: RQReturn): Promise<ReturnResponse> => {
    void _rq

    return Promise.resolve(returnData)
  }
}

export { Return }
