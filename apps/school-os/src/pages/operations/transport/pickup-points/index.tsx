import OperationsTablePage from '@pages/operations/_shared'
import {
  pickupPointsConfig,
  usePickupPoints
} from '@store/useOperations/useTransport/usePickupPoints'

const PickupPointsOperationsPage = () => {
  const { data } = usePickupPoints.list({})

  return <OperationsTablePage config={{ ...pickupPointsConfig, rows: data }} />
}

export default PickupPointsOperationsPage
