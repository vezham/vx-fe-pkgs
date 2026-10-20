import type { ReactNode } from 'react'

import { AcademicNameField } from '@pages/academic/shared/name-field'
import { AcademicStatusSwitch } from '@pages/academic/shared/status-switch'

type Status = 'Active' | 'Inactive'
type Classes = Parameters<typeof AcademicNameField>[0]['classes'] &
  Parameters<typeof AcademicStatusSwitch>[0]['classes'] & { form: string }

export const AcademicNameStatusForm = ({
  classes,
  name,
  nameError,
  status,
  statusError,
  selectedStatus,
  children,
  onNameChange,
  onStatusChange
}: {
  classes: Classes
  name: string
  nameError?: string
  status: Status
  statusError?: string
  selectedStatus: Status
  children: ReactNode
  onNameChange: (value: string) => void
  onStatusChange: (status: Status) => void
}) => (
  <div className={classes.form}>
    <AcademicNameField
      classes={classes}
      error={nameError}
      value={name}
      onChange={onNameChange}
    />
    {children}
    <AcademicStatusSwitch
      ariaLabel="Class status"
      classes={classes}
      error={statusError}
      selectedStatus={selectedStatus}
      status={status}
      onChange={onStatusChange}
    />
  </div>
)
