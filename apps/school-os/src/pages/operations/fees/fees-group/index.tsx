import OperationsTablePage from '@pages/operations/_shared'
import {
  feesGroupConfig,
  useFeesGroup
} from '@store/useOperations/useFees/useFeesGroup'

const FeesGroupOperationsPage = () => {
  const { data } = useFeesGroup.list({})

  return <OperationsTablePage config={{ ...feesGroupConfig, rows: data }} />
}

export default FeesGroupOperationsPage
