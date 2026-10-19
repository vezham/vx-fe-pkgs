import type { ComponentType, ReactNode } from 'react'

import { EntityDrawer } from '@pages/academic/shared/entity-drawer'
import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'

type EntityRow = { id: string }

type Options<Row extends EntityRow, FormState, Errors> = EntityDrawerProps<
  Row,
  FormState,
  Errors
> & {
  classes: Parameters<typeof EntityDrawer>[0]['classes']
  createLabel: string
  Details: ComponentType<EntityDetailsProps<Row>>
  Form?: ComponentType<EntityFormProps<Row, FormState, Errors>>
  formContent?: ReactNode
  getTitle: (row: Row) => string
}

export const EntityDrawerPage = <Row extends EntityRow, FormState, Errors>({
  classes,
  createLabel,
  Details,
  Form,
  formContent,
  getTitle,
  ...props
}: Options<Row, FormState, Errors>) => {
  const { form, formErrors, mode, row, onFormChange } = props
  const title = mode === 'create' ? createLabel : row ? getTitle(row) : ''

  return (
    <EntityDrawer
      {...props}
      classes={classes}
      createLabel={createLabel}
      detailsContent={<Details row={row} />}
      formContent={
        formContent ??
        (Form ? (
          <Form
            form={form}
            formErrors={formErrors}
            mode={mode}
            row={row}
            onFormChange={onFormChange}
          />
        ) : null)
      }
      rowId={row?.id}
      title={title}
      onCopyId={() => row && props.onCopyId(row)}
      onCopyLink={() => row && props.onCopyLink(row)}
      onOpenPage={() => row && props.onOpenPage(row)}
    />
  )
}
