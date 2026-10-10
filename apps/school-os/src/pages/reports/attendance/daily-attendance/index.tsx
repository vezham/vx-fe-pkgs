import {
  dateOptions,
  rowCountOptions,
  statusLegend
} from '@pages/reports/_shared/attendance-options'
import { ReportTablePage } from '@pages/reports/_shared/report-table'

import { dailyAttendanceConfig } from './data'

const DailyAttendancePage = () => {
  return (
    <ReportTablePage
      key={dailyAttendanceConfig.key}
      config={dailyAttendanceConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default DailyAttendancePage
