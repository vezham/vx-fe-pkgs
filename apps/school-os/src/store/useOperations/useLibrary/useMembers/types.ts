export type RQMembers = Record<string, never>

export type MemberItem = {
  id: string
  createdAt: string
  displayId: string
  member: {
    name: string
    subtitle: string
    avatar: string
  }
  cardNo: number
  email: string
  dateOfJoin: string
  mobile: string
}

export type MembersResponse = MemberItem[]
