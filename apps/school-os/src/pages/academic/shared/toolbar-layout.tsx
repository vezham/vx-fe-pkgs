import type { ReactNode } from 'react'

import { SearchField, Surface } from '@vezham/react-v3'

type HeaderProps = {
  actions: ReactNode
  actionsClassName: string
  eyebrow: string
  headerClassName: string
  mutedTextClassName: string
  title: string
  titleClassName: string
}

const AcademicToolbarHeader = ({
  actions,
  actionsClassName,
  eyebrow,
  headerClassName,
  mutedTextClassName,
  title,
  titleClassName
}: HeaderProps) => (
  <div className={headerClassName}>
    <div>
      <p className={mutedTextClassName}>{eyebrow}</p>
      <h1 className={titleClassName}>{title}</h1>
    </div>
    <div className={actionsClassName}>{actions}</div>
  </div>
)

type SearchProps = {
  ariaLabel: string
  className: string
  value: string
  alignEnd?: boolean
  onChange: (value: string) => void
}

const AcademicToolbarSearch = ({
  ariaLabel,
  className,
  value,
  alignEnd = false,
  onChange
}: SearchProps) => (
  <div className={className}>
    <div className={alignEnd ? 'ml-auto' : undefined}>
      <SearchField aria-label={ariaLabel} value={value} onChange={onChange}>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search" />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
    </div>
  </div>
)

type ToolbarClassNames = {
  headerRow: string
  mutedText: string
  title: string
  toolbar: string
  toolbarActions: string
}

type ToolbarProps = {
  classNames: ToolbarClassNames
  controls: ReactNode
  eyebrow?: string
  searchAlignEnd?: boolean
  searchAriaLabel: string
  searchQuery: string
  title: string
  onSearchChange: (value: string) => void
}

export const AcademicToolbar = ({
  classNames,
  controls,
  eyebrow = 'Academic',
  searchAlignEnd = false,
  searchAriaLabel,
  searchQuery,
  title,
  onSearchChange
}: ToolbarProps) => (
  <Surface className={classNames.toolbar}>
    <AcademicToolbarHeader
      actionsClassName={classNames.toolbarActions}
      eyebrow={eyebrow}
      headerClassName={classNames.headerRow}
      mutedTextClassName={classNames.mutedText}
      title={title}
      titleClassName={classNames.title}
      actions={controls}
    />
    <AcademicToolbarSearch
      ariaLabel={searchAriaLabel}
      alignEnd={searchAlignEnd}
      className={classNames.headerRow}
      value={searchQuery}
      onChange={onSearchChange}
    />
  </Surface>
)
