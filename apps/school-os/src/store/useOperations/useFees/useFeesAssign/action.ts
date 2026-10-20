import { feesAssignData } from './data'
import type { FeesAssignResponse, RQFeesAssign } from './types'

const FeesAssign = {
  list: async (_rq: RQFeesAssign): Promise<FeesAssignResponse> => {
    void _rq

    return Promise.resolve(feesAssignData)
  }
}

export { FeesAssign }
