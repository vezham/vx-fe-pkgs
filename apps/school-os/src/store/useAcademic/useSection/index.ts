import { useQuery } from '@tanstack/react-query'

import { Sections } from './action'
import { sectionData } from './data'
import type { RQSection } from './types'

export * from './data'
export * from './types'

const CK_SECTION = 'section'

const useList = (rq: RQSection = {}) =>
  useQuery({
    queryKey: [CK_SECTION, rq],
    queryFn: () => Sections.list(rq),
    initialData: sectionData
  })

export const useSection = { list: useList }
