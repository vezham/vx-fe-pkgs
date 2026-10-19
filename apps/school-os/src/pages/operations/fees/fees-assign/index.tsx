import OperationsTablePage from '@pages/operations/_shared'
import {
  feesAssignConfig,
  useFeesAssign
} from '@store/useOperations/useFees/useFeesAssign'

const FeesAssignOperationsPage = () => {
  const { data } = useFeesAssign.list({})

  return <OperationsTablePage config={{ ...feesAssignConfig, rows: data }} />
}

export default FeesAssignOperationsPage
