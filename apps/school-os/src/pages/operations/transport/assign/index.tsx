import OperationsTablePage from '@pages/operations/_shared'
import {
  assignVehicleConfig,
  useAssign
} from '@store/useOperations/useTransport/useAssign'

const AssignVehicleOperationsPage = () => {
  const { data } = useAssign.list({})

  return <OperationsTablePage config={{ ...assignVehicleConfig, rows: data }} />
}

export default AssignVehicleOperationsPage
