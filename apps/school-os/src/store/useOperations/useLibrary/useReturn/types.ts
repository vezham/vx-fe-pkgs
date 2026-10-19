export type RQReturn = Record<string, never>

export type ReturnItem = {
  id: string
  createdAt: string
  displayId: string
  dateOfIssue: string
  dueDate: string
  issueTo: {
    name: string
    subtitle: string
    avatar: string
  }
  booksIssued: number
  bookReturned: number
  remarks: string
}

export type ReturnResponse = ReturnItem[]
