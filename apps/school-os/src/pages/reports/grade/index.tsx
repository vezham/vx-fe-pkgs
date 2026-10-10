import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  gradeReportsConfig,
  rowCountOptions,
  statusLegend
} from './data'

const GradeReportsPage = () => {
  return (
    <ReportTablePage
      key={gradeReportsConfig.key}
      config={gradeReportsConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default GradeReportsPage
