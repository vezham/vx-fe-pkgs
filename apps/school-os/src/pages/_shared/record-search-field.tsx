import { SearchField } from '@vezham/react-v3'

type Props = {
  title: string
  value: string
  onChange: (value: string) => void
}

export const RecordSearchField = ({ title, value, onChange }: Props) => (
  <SearchField aria-label={`Search ${title}`} value={value} onChange={onChange}>
    <SearchField.Group>
      <SearchField.SearchIcon />
      <SearchField.Input placeholder="Search" />
      <SearchField.ClearButton />
    </SearchField.Group>
  </SearchField>
)
