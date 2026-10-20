import { useQuery } from '@tanstack/react-query'

import { Classrooms } from './action'
import { classroomData } from './data'
import type { RQClassroom } from './types'

export * from './data'
export * from './types'

const CK_CLASSROOM = 'classroom'

const useList = (rq: RQClassroom = {}) =>
  useQuery({
    queryKey: [CK_CLASSROOM, rq],
    queryFn: () => Classrooms.list(rq),
    initialData: classroomData
  })

export const useClassroom = { list: useList }
