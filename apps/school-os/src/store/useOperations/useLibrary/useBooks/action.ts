import { booksData } from './data'
import type { BooksResponse, RQBooks } from './types'

const Books = {
  list: async (_rq: RQBooks): Promise<BooksResponse> => {
    void _rq

    return Promise.resolve(booksData)
  }
}

export { Books }
