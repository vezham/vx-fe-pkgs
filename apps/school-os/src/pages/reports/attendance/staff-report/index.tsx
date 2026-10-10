import {
  dateOptions,
  rowCountOptions,
  statusLegend
} from '@pages/reports/_shared/attendance-options'
import { ReportTablePage } from '@pages/reports/_shared/report-table'

import { staffReportConfig } from './data'

const StaffReportPage = () => {
  return (
    <ReportTablePage
      key={staffReportConfig.key}
      config={staffReportConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default StaffReportPage
