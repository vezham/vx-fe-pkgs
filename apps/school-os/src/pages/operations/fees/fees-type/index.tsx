import OperationsTablePage from '@pages/operations/_shared'
import {
  feesTypeConfig,
  useFeesType
} from '@store/useOperations/useFees/useFeesType'

const FeesTypeOperationsPage = () => {
  const { data } = useFeesType.list({})

  return <OperationsTablePage config={{ ...feesTypeConfig, rows: data }} />
}

export default FeesTypeOperationsPage
