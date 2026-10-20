import OperationsTablePage from '@pages/operations/_shared'
import {
  roomTypeConfig,
  useRoomType
} from '@store/useOperations/useHostel/useRoomType'

const RoomTypeOperationsPage = () => {
  const { data } = useRoomType.list({})

  return <OperationsTablePage config={{ ...roomTypeConfig, rows: data }} />
}

export default RoomTypeOperationsPage
