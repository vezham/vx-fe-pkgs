import {
  dateOptions,
  rowCountOptions,
  statusLegend
} from '@pages/reports/_shared/attendance-options'
import { ReportTablePage } from '@pages/reports/_shared/report-table'

import { attendanceReportConfig } from './data'

const AttendanceReportPage = () => {
  return (
    <ReportTablePage
      key={attendanceReportConfig.key}
      config={attendanceReportConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default AttendanceReportPage
