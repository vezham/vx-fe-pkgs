import OperationsTablePage from '@pages/operations/_shared'
import {
  hostelRoomConfig,
  useHostelRoom
} from '@store/useOperations/useHostel/useHostelRoom'

const HostelRoomOperationsPage = () => {
  const { data } = useHostelRoom.list({})

  return <OperationsTablePage config={{ ...hostelRoomConfig, rows: data }} />
}

export default HostelRoomOperationsPage
