import OperationsTablePage from '@pages/operations/_shared'
import {
  libraryMembersConfig,
  useMembers
} from '@store/useOperations/useLibrary/useMembers'

const LibraryMembersOperationsPage = () => {
  const { data } = useMembers.list({})

  return (
    <OperationsTablePage config={{ ...libraryMembersConfig, rows: data }} />
  )
}

export default LibraryMembersOperationsPage
