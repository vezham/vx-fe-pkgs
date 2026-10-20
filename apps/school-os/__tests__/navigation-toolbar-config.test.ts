import { getLayoutRightActions } from '../src/pages/_shared/layout-actions'

describe('configured section toolbar', () => {
  it.each([
    ['/academic/classes/allclasses', 'allclasses', 'Add Class'],
    ['/academic/classes/schedule', 'schedule', 'Add Schedule'],
    ['/operations/fees/fees-assign', 'fees-assign', 'Assign New']
  ])(
    'uses configured labels and publishes context for %s',
    (pathname, pageKey, label) => {
      const emit = vi.fn(() => true)
      const create = getLayoutRightActions(pathname, pageKey, emit).find(
        action => action.kind === 'primary'
      )
      expect(create?.label).toBe(label)
      create?.onAction?.()
      expect(emit).toHaveBeenCalledExactlyOnceWith({
        actionKey: 'create',
        pageKey,
        pathname
      })
    }
  )

  it('publishes Sync and nested menu action keys', () => {
    const pathname = '/academic/classes/allclasses'
    const emit = vi.fn(() => true)
    const actions = getLayoutRightActions(pathname, 'allclasses', emit)
    actions.find(action => action.kind === 'sync')?.onAction?.()
    actions.find(action => action.key === 'export')?.children?.[0].onAction?.()
    expect(emit.mock.calls.map(([event]) => event.actionKey)).toEqual([
      'sync',
      'export-pdf'
    ])
  })

  it.each([
    ['/academic/examinations/exam-attendance', 'exam-attendance'],
    ['/academic/examinations/exam-results', 'exam-results'],
    ['/reports/attendance/attendance-report', 'attendance-report']
  ])(
    'disables Add while retaining inherited controls on %s',
    (pathname, pageKey) => {
      const actions = getLayoutRightActions(pathname, pageKey, () => false)
      expect(actions.some(action => action.kind === 'primary')).toBe(false)
      expect(actions.some(action => action.kind === 'search')).toBe(true)
      expect(actions.some(action => action.kind === 'sync')).toBe(true)
      expect(
        actions
          .find(action => action.key === 'export')
          ?.children?.map(action => action.key)
      ).toEqual(['export-pdf', 'export-excel'])
    }
  )
})
