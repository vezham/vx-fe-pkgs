import OperationsTablePage from '@pages/operations/_shared'
import { usePlayers } from '@store/useOperations/usePlayers'

import { playersConfig } from './data'

const PlayersOperationsPage = () => {
  const { data } = usePlayers.list({})

  return <OperationsTablePage config={{ ...playersConfig, rows: data }} />
}

export default PlayersOperationsPage
