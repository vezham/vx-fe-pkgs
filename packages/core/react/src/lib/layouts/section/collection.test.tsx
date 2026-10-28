import { fireEvent, render, screen, within } from '@testing-library/react'
import { useEffect } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Table } from '@vezham/react-v3'

import { SectionLayout } from './index'

const route = vi.hoisted(() => ({ pathname: '/academic/reasons' }))
const navigate = vi.hoisted(() => vi.fn())
vi.mock('@tanstack/react-router', () => ({
  useLocation: () => route,
  useNavigate: () => navigate,
  useRouter: () => ({ history: { back: vi.fn(), forward: vi.fn() } })
}))
vi.mock('../../components/workspace-navigation', () => ({
  useWorkspaceNavigation: () => ({
    isNavigationCollapsed: true,
    toggleNavigation: vi.fn(),
    registerMobileSidebar: vi.fn()
  }),
  useSidebarShortcut: vi.fn()
}))

const tabs = [
  {
    key: 'allclasses',
    title: 'All Classes',
    href: '/academic/classes/allclasses'
  },
  { key: 'schedule', title: 'Schedule', href: '/academic/classes/schedule' }
]
const timetableTabs = [
  { key: 'day', title: 'Day', href: '/academic/timetable/day' },
  { key: 'week', title: 'Week', href: '/academic/timetable/week' },
  { key: 'month', title: 'Month', href: '/academic/timetable/month' },
  { key: 'year', title: 'Year', href: '/academic/timetable/year' }
]
const TablePage = ({ onMount }: { onMount: () => void }) => {
  useEffect(onMount, [onMount])
  return (
    <Table>
      <Table.Content aria-label="Page records">
        <Table.Header>
          <Table.Column id="name" isRowHeader>
            Name
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row id="one">
            <Table.Cell>Class I</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Content>
    </Table>
  )
}

describe('Section route content', () => {
  it('mounts a standalone page once and preserves it across tabbed and standalone navigation', () => {
    const onMount = vi.fn()
    const content = (hasTabs: boolean) => (
      <SectionLayout title="Academic" tabs={hasTabs ? tabs : []}>
        <TablePage onMount={onMount} />
      </SectionLayout>
    )
    route.pathname = '/academic/reasons'
    const { rerender } = render(content(false))
    expect(onMount).toHaveBeenCalledTimes(1)
    const toolbar = screen.getByRole('group', { name: 'Toolbar actions' })
    const table = screen.getByRole('grid', { name: 'Page records' })

    for (let iteration = 0; iteration < 3; iteration++) {
      route.pathname = tabs[0].href
      rerender(content(true))
      const tab = screen.getByRole('tab', { name: 'All Classes' })
      const panel = screen.getByRole('tabpanel', { name: 'All Classes' })
      expect(tab).toHaveAttribute('aria-selected', 'true')
      expect(tab).toHaveAttribute('aria-controls', panel.id)
      expect(within(panel).getByRole('grid', { name: 'Page records' })).toBe(
        table
      )
      fireEvent.click(screen.getByRole('tab', { name: 'Schedule' }))
      expect(navigate).toHaveBeenCalledWith({ to: tabs[1].href })
      route.pathname = '/academic/reasons'
      rerender(content(false))
      expect(screen.queryByRole('tablist')).toBeNull()
      expect(screen.getByRole('grid', { name: 'Page records' })).toBe(table)
    }
    expect(onMount).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('group', { name: 'Toolbar actions' })).toBe(toolbar)
  })

  it('remounts the tab list when navigation switches tab groups', () => {
    route.pathname = tabs[0].href
    const { rerender } = render(
      <SectionLayout title="Academic" tabs={tabs}>
        <TablePage onMount={vi.fn()} />
      </SectionLayout>
    )
    const classesTabList = screen.getByRole('tablist')
    const classesTabListContainer = classesTabList.parentElement

    route.pathname = '/academic/timetable/week'
    rerender(
      <SectionLayout title="Academic" tabs={timetableTabs}>
        <TablePage onMount={vi.fn()} />
      </SectionLayout>
    )

    const timetableTabList = screen.getByRole('tablist')
    expect(timetableTabList).not.toBe(classesTabList)
    expect(timetableTabList.parentElement).not.toBe(classesTabListContainer)
    expect(screen.getByRole('tab', { name: 'Week' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
  })
})
