import OperationsTablePage from '@pages/operations/_shared'
import { useSports } from '@store/useOperations/useSports'

import { sportsConfig } from './data'

const SportsOperationsPage = () => {
  const { data } = useSports.list({})

  return <OperationsTablePage config={{ ...sportsConfig, rows: data }} />
}

export default SportsOperationsPage
