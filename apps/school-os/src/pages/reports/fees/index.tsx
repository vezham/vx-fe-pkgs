import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  feesReportsConfig,
  rowCountOptions,
  statusLegend
} from './data'

const FeesReportsPage = () => {
  return (
    <ReportTablePage
      key={feesReportsConfig.key}
      config={feesReportsConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default FeesReportsPage
