import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  rowCountOptions,
  statusLegend,
  studentReportsConfig
} from './data'

const StudentReportsPage = () => {
  return (
    <ReportTablePage
      key={studentReportsConfig.key}
      config={studentReportsConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default StudentReportsPage
