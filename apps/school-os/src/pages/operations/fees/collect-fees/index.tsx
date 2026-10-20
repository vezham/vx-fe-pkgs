import OperationsTablePage from '@pages/operations/_shared'
import {
  collectFeesConfig,
  useCollectFees
} from '@store/useOperations/useFees/useCollectFees'

const CollectFeesOperationsPage = () => {
  const { data } = useCollectFees.list({})

  return <OperationsTablePage config={{ ...collectFeesConfig, rows: data }} />
}

export default CollectFeesOperationsPage
