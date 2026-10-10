import OperationsTablePage from '@pages/operations/_shared'
import {
  feesMasterConfig,
  useFeesMaster
} from '@store/useOperations/useFees/useFeesMaster'

const FeesMasterOperationsPage = () => {
  const { data } = useFeesMaster.list({})

  return <OperationsTablePage config={{ ...feesMasterConfig, rows: data }} />
}

export default FeesMasterOperationsPage
