import { useQuery } from '@tanstack/react-query'

import { IssueBooks } from './action'
import { issueBookConfig, issueBooksData } from './data'
import type { RQIssueBooks } from './types'

export * from './data'
export * from './types'

const CK_ISSUE_BOOKS = 'issue-books'

const useList = (rq: RQIssueBooks = {}) =>
  useQuery({
    queryKey: [CK_ISSUE_BOOKS, rq],
    queryFn: () => IssueBooks.list(rq),
    initialData: issueBooksData
  })

export const useIssueBooks = { list: useList }

export { issueBookConfig }
