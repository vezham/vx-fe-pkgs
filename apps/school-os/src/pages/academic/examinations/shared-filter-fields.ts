export const createExamFilterFields = (
  classOptions: readonly string[],
  sectionOptions: readonly string[],
  examtypeOptions: readonly string[]
) =>
  [
    {
      field: 'classes',
      ariaLabel: 'Filter by classes',
      label: 'Class',
      placeholder: 'Select classes',
      options: classOptions
    },
    {
      field: 'section',
      ariaLabel: 'Filter by section',
      label: 'Section',
      placeholder: 'Select section',
      options: sectionOptions
    },
    {
      field: 'examtype',
      ariaLabel: 'Filter by examtype',
      label: 'Exam Type',
      placeholder: 'Select examtype',
      options: examtypeOptions
    }
  ] as const
