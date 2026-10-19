import { issueBooksData } from './data'
import type { IssueBooksResponse, RQIssueBooks } from './types'

const IssueBooks = {
  list: async (_rq: RQIssueBooks): Promise<IssueBooksResponse> => {
    void _rq

    return Promise.resolve(issueBooksData)
  }
}

export { IssueBooks }
