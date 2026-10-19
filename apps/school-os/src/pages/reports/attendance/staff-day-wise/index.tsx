import {
  dateOptions,
  rowCountOptions,
  statusLegend
} from '@pages/reports/_shared/attendance-options'
import { ReportTablePage } from '@pages/reports/_shared/report-table'

import { staffDayWiseConfig } from './data'

const StaffDayWisePage = () => {
  return (
    <ReportTablePage
      key={staffDayWiseConfig.key}
      config={staffDayWiseConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default StaffDayWisePage
