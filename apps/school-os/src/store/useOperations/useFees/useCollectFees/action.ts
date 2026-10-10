import { collectFeesData } from './data'
import type { CollectFeesResponse, RQCollectFees } from './types'

const CollectFees = {
  list: async (_rq: RQCollectFees): Promise<CollectFeesResponse> => {
    void _rq

    return Promise.resolve(collectFeesData)
  }
}

export { CollectFees }
