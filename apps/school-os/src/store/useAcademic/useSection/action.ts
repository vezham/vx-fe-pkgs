import { sectionData } from './data'
import type { RQSection, SectionResponse } from './types'

const Sections = {
  list: async (_rq: RQSection): Promise<SectionResponse> => {
    void _rq

    return Promise.resolve(sectionData)
  }
}

export { Sections }
