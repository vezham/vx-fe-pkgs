export type RQBooks = Record<string, never>

export type BookItem = {
  id: string
  createdAt: string
  displayId: string
  bookName: string
  bookNo: number
  publisher: string
  author: string
  subject: string
  rackNo: number
  qty: number
  available: number
  price: string
  postDate: string
}

export type BooksResponse = BookItem[]
