import { subjectData } from './data'
import type { RQSubject, SubjectResponse } from './types'

const Subjects = {
  list: async (_rq: RQSubject): Promise<SubjectResponse> => {
    void _rq

    return Promise.resolve(subjectData)
  }
}

export { Subjects }
