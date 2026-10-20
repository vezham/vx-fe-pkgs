import { classRoutineData } from './data'
import type { ClassRoutineResponse, RQClassRoutine } from './types'

const ClassRoutine = {
  list: async (_rq: RQClassRoutine): Promise<ClassRoutineResponse> => {
    void _rq

    return Promise.resolve(classRoutineData)
  }
}

export { ClassRoutine }
