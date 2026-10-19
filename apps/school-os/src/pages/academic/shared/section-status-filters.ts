export const createSectionStatusFilters = (
  sectionOptions: readonly string[],
  statusOptions: readonly string[]
) =>
  [
    {
      field: 'section',
      ariaLabel: 'Filter by section',
      label: 'Section',
      placeholder: 'Select section',
      options: sectionOptions
    },
    {
      field: 'status',
      ariaLabel: 'Filter by capacity',
      label: 'Status',
      placeholder: 'Select status',
      options: statusOptions
    }
  ] as const
