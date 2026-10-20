import OperationsTablePage from '@pages/operations/_shared'
import {
  useVehicleDrivers,
  vehicleDriversConfig
} from '@store/useOperations/useTransport/useVehicleDrivers'

const VehicleDriversOperationsPage = () => {
  const { data } = useVehicleDrivers.list({})

  return (
    <OperationsTablePage config={{ ...vehicleDriversConfig, rows: data }} />
  )
}

export default VehicleDriversOperationsPage
