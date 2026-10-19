import { Pagination } from '@vezham/react-v3'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (value: number | ((current: number) => number)) => void
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange
}: Props) => (
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.Previous
        isDisabled={currentPage <= 1}
        onPress={() => onPageChange(value => Math.max(1, value - 1))}>
        <Pagination.PreviousIcon />
        <span>Prev</span>
      </Pagination.Previous>
    </Pagination.Item>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(item => (
      <Pagination.Item key={item}>
        <Pagination.Link
          isActive={item === currentPage}
          onPress={() => onPageChange(item)}>
          {item}
        </Pagination.Link>
      </Pagination.Item>
    ))}
    <Pagination.Item>
      <Pagination.Next
        isDisabled={currentPage >= totalPages}
        onPress={() => onPageChange(value => Math.min(totalPages, value + 1))}>
        <span>Next</span>
        <Pagination.NextIcon />
      </Pagination.Next>
    </Pagination.Item>
  </Pagination.Content>
)
