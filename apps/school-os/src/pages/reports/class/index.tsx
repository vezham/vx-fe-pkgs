import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  classReportsConfig,
  dateOptions,
  rowCountOptions,
  statusLegend
} from './data'

const ClassReportsPage = () => {
  return (
    <ReportTablePage
      key={classReportsConfig.key}
      config={classReportsConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default ClassReportsPage
