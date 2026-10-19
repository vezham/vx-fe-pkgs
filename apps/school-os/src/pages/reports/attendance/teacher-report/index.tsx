import {
  dateOptions,
  rowCountOptions,
  statusLegend
} from '@pages/reports/_shared/attendance-options'
import { ReportTablePage } from '@pages/reports/_shared/report-table'

import { teacherReportConfig } from './data'

const TeacherReportPage = () => {
  return (
    <ReportTablePage
      key={teacherReportConfig.key}
      config={teacherReportConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default TeacherReportPage
