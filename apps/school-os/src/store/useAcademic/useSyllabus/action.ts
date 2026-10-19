import { syllabusData } from './data'
import type { RQSyllabus, SyllabusResponse } from './types'

const Syllabus = {
  list: async (_rq: RQSyllabus): Promise<SyllabusResponse> => {
    void _rq

    return Promise.resolve(syllabusData)
  }
}

export { Syllabus }
