import { sportsData } from './data'
import type { RQSports, SportsResponse } from './types'

const Sports = {
  list: async (_rq: RQSports): Promise<SportsResponse> => {
    void _rq

    return Promise.resolve(sportsData)
  }
}

export { Sports }
