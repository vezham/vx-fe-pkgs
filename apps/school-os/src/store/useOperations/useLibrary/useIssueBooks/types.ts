export type RQIssueBooks = Record<string, never>

export type IssueBookItem = {
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
  remarks: string
}

export type IssueBooksResponse = IssueBookItem[]
