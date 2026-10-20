import { feesGroupData } from './data'
import type { FeesGroupResponse, RQFeesGroup } from './types'

const FeesGroup = {
  list: async (_rq: RQFeesGroup): Promise<FeesGroupResponse> => {
    void _rq

    return Promise.resolve(feesGroupData)
  }
}

export { FeesGroup }
