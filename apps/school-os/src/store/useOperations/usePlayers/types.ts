export type RQPlayers = Record<string, never>

export type PlayerItem = {
  id: string
  createdAt: string
  displayId: string
  sports: string
  playername: {
    name: string
    subtitle: string
    avatar: string
  }
  dateofjoin: string
}

export type PlayersResponse = PlayerItem[]
