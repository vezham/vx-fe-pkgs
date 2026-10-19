import { playersData } from './data'
import type { PlayersResponse, RQPlayers } from './types'

const Players = {
  list: async (_rq: RQPlayers): Promise<PlayersResponse> => {
    void _rq

    return Promise.resolve(playersData)
  }
}

export { Players }
