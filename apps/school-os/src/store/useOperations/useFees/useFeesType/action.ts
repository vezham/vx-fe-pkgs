import { feesTypeData } from './data'
import type { FeesTypeResponse, RQFeesType } from './types'

const FeesType = {
  list: async (_rq: RQFeesType): Promise<FeesTypeResponse> => {
    void _rq

    return Promise.resolve(feesTypeData)
  }
}

export { FeesType }
