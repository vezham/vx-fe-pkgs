import { initialRows as gradesData } from './data'
import type { GradesResponse, RQGrades } from './types'

const Grades = {
  list: async (_rq: RQGrades): Promise<GradesResponse> => {
    void _rq

    return Promise.resolve(gradesData)
  }
}

export { Grades }
