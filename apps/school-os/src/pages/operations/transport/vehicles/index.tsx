import OperationsTablePage from '@pages/operations/_shared'
import {
  useVehicles,
  vehiclesConfig
} from '@store/useOperations/useTransport/useVehicles'

const VehiclesOperationsPage = () => {
  const { data } = useVehicles.list({})

  return <OperationsTablePage config={{ ...vehiclesConfig, rows: data }} />
}

export default VehiclesOperationsPage
