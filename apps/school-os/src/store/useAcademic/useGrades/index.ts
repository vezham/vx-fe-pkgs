import { useQuery } from '@tanstack/react-query'

import { Grades } from './action'
import { initialRows as gradesData } from './data'
import type { RQGrades } from './types'

export * from './data'
export * from './types'

const CK_GRADES = 'grades'

const useList = (rq: RQGrades = {}) =>
  useQuery({
    queryKey: [CK_GRADES, rq],
    queryFn: () => Grades.list(rq),
    initialData: gradesData
  })

export const useGrades = { list: useList }
