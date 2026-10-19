export type RQSports = Record<string, never>

export type SportItem = {
  id: string
  createdAt: string
  displayId: string
  name: string
  coach: {
    name: string
    subtitle: string
    avatar: string
  }
  startedYear: number
}

export type SportsResponse = SportItem[]
