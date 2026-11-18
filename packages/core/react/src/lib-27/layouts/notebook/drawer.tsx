import { useNavigate } from '@tanstack/react-router'
import type { ComponentProps, ReactNode } from 'react'

import { useNotebookLayout } from '@vezham/docs-react/layouts/notebook'
import { Close } from '@vezham/icons-react'
import { ListBox, Select } from '@vezham/react-v3'

import { Brand } from '../../components/brand'

export type NotebookSection = { id: string; title: string; url: string }

const NotebookSectionSelect = ({
  sections,
  selectedSection
}: {
  sections: readonly NotebookSection[]
  selectedSection: string | undefined
}) => {
  const navigate = useNavigate()
  return (
    <Select
      aria-label="Documentation section"
      className="w-full"
      value={selectedSection}
      onChange={key => {
        const section = sections.find(section => section.id === key)
        if (section) void navigate({ to: section.url })
      }}>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {sections.map(section => (
            <ListBox.Item
              key={section.id}
              id={section.id}
              textValue={section.title}>
              {section.title}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}

export type NotebookDrawerHeaderProps = ComponentProps<'div'> & {
  brand?: ReactNode
  sections: readonly NotebookSection[]
  selectedSection: string | undefined
  secondary?: ReactNode
}

export const NotebookDrawerHeader = ({
  brand = <Brand.Link to="/" logoSize={22} />,
  sections,
  selectedSection,
  secondary,
  children,
  className,
  ...props
}: NotebookDrawerHeaderProps) => {
  const { slots } = useNotebookLayout()
  const SidebarTrigger = slots.sidebar.trigger
  const sectionSelect = (
    <NotebookSectionSelect
      sections={sections}
      selectedSection={selectedSection}
    />
  )
  return (
    <>
      <div
        {...props}
        className={`flex flex-col gap-4 border-b px-4 pt-4 pb-3 md:hidden ${className ?? ''}`}>
        <div className="flex items-center justify-between gap-4 ps-1">
          {brand}
          <SidebarTrigger
            aria-label="Close sidebar"
            className="text-muted hover:bg-default-hover inline-flex size-8 shrink-0 items-center justify-center rounded-md">
            <Close size={16} aria-hidden="true" />
          </SidebarTrigger>
        </div>
        {sectionSelect}
      </div>
      <div
        className={`hidden flex-col gap-3 border-b p-4 md:flex lg:hidden ${className ?? ''}`}>
        {secondary}
        {sectionSelect}
      </div>
      <div className={`hidden lg:block ${className ?? ''}`}>{children}</div>
    </>
  )
}

export type NotebookDrawerFooterProps = ComponentProps<'div'> & {
  secondary?: ReactNode
  controls?: ReactNode
}

export const NotebookDrawerFooter = ({
  secondary,
  controls,
  className,
  ...props
}: NotebookDrawerFooterProps) => (
  <div
    {...props}
    className={`!hidden !w-full items-center !justify-between gap-2 !border-0 px-4 pt-2 pb-4 max-md:!flex ${className ?? ''}`}>
    {secondary}
    <div className="ms-auto">{controls}</div>
  </div>
)
