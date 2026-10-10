import { membersData } from './data'
import type { MembersResponse, RQMembers } from './types'

const Members = {
  list: async (_rq: RQMembers): Promise<MembersResponse> => {
    void _rq

    return Promise.resolve(membersData)
  }
}

export { Members }
