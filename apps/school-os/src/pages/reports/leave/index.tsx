import { ReportTablePage } from '@pages/reports/_shared/report-table'

import {
  dateOptions,
  leaveReportsConfig,
  rowCountOptions,
  statusLegend
} from './data'

const LeaveReportsPage = () => {
  return (
    <ReportTablePage
      key={leaveReportsConfig.key}
      config={leaveReportsConfig}
      dateOptions={dateOptions}
      rowCountOptions={rowCountOptions}
      statusLegend={statusLegend}
    />
  )
}

export default LeaveReportsPage
