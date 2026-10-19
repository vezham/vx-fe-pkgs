import OperationsTablePage from '@pages/operations/_shared'
import {
  hostelListConfig,
  useHostelList
} from '@store/useOperations/useHostel/useHostelList'

const HostelListOperationsPage = () => {
  const { data } = useHostelList.list({})

  return <OperationsTablePage config={{ ...hostelListConfig, rows: data }} />
}

export default HostelListOperationsPage
