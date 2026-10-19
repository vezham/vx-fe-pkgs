import OperationsTablePage from '@pages/operations/_shared'
import {
  issueBookConfig,
  useIssueBooks
} from '@store/useOperations/useLibrary/useIssueBooks'

const IssueBookOperationsPage = () => {
  const { data } = useIssueBooks.list({})

  return <OperationsTablePage config={{ ...issueBookConfig, rows: data }} />
}

export default IssueBookOperationsPage
