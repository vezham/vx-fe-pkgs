import { useQuery } from '@tanstack/react-query'

import { ClassRoutine } from './action'
import { classRoutineData } from './data'
import type { RQClassRoutine } from './types'

export * from './data'
export * from './types'

const CK_CLASS_ROUTINE = 'class-routine'

const useList = (rq: RQClassRoutine = {}) =>
  useQuery({
    queryKey: [CK_CLASS_ROUTINE, rq],
    queryFn: () => ClassRoutine.list(rq),
    initialData: classRoutineData
  })

export const useClassRoutine = { list: useList }
