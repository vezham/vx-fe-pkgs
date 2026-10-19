import { useQuery } from '@tanstack/react-query'

import { Members } from './action'
import { libraryMembersConfig, membersData } from './data'
import type { RQMembers } from './types'

export * from './data'
export * from './types'

const CK_MEMBERS = 'members'

const useList = (rq: RQMembers = {}) =>
  useQuery({
    queryKey: [CK_MEMBERS, rq],
    queryFn: () => Members.list(rq),
    initialData: membersData
  })

export const useMembers = { list: useList }

export { libraryMembersConfig }
