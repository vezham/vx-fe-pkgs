import OperationsTablePage from '@pages/operations/_shared'
import {
  returnBooksConfig,
  useReturn
} from '@store/useOperations/useLibrary/useReturn'

const ReturnBooksOperationsPage = () => {
  const { data } = useReturn.list({})

  return <OperationsTablePage config={{ ...returnBooksConfig, rows: data }} />
}

export default ReturnBooksOperationsPage
