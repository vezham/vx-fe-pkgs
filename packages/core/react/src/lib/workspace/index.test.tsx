import { act, renderHook, waitFor } from '@testing-library/react'
import { IDBObjectStore } from 'fake-indexeddb'
import type { ReactNode } from 'react'
import { afterEach, expect, it, vi } from 'vitest'

import { WorkspaceProvider, useWorkspace, useWorkspaceStore } from './index'
import {
  createInitialWorkspaceCatalog,
  parseWorkspaceCatalog,
  workspaceCatalogKey,
  workspaceDataKey,
  workspaceSelectionKey
} from './model'

const wrapper = ({ children }: { children: ReactNode }) => (
  <WorkspaceProvider appId="workspace-tests" defaultName="Demo Workspace">
    {children}
  </WorkspaceProvider>
)
const useTestWorkspace = () => ({
  workspace: useWorkspace(),
  notes: useWorkspaceStore('notes', '')
})
const mountWorkspace = async () => {
  const hook = renderHook(useTestWorkspace, { wrapper })
  await waitFor(() => expect(hook.result.current.notes.isReady).toBe(true))
  return hook
}
afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

it('isolates records and keeps only selection in localStorage', async () => {
  const { result } = await mountWorkspace()
  await act(async () => {
    await result.current.notes.setValue('Default notes')
  })
  await act(async () => {
    await result.current.workspace.create('  Design team  ')
  })
  const created = result.current.workspace.active
  expect(created.name).toBe('Design team')
  expect(created.id).toMatch(/^local-[a-f0-9]{32}$/)
  await waitFor(() => expect(result.current.notes.isReady).toBe(true))
  expect(result.current.notes.value).toBe('')
  await act(async () => {
    await result.current.notes.setValue('Design notes')
  })
  act(() => result.current.workspace.select('default'))
  await waitFor(() => expect(result.current.notes.value).toBe('Default notes'))
  act(() => result.current.workspace.select(created.id))
  await waitFor(() => expect(result.current.notes.value).toBe('Design notes'))
  expect(
    JSON.parse(
      localStorage.getItem(workspaceSelectionKey('workspace-tests')) ?? 'null'
    )
  ).toBe(created.id)
  expect(
    localStorage.getItem(workspaceCatalogKey('workspace-tests'))
  ).toBeNull()
  expect(
    localStorage.getItem(
      workspaceDataKey('workspace-tests', created.id, 'notes')
    )
  ).toBeNull()
})

it('restores catalog, current selection, and records on remount', async () => {
  const first = await mountWorkspace()
  await act(async () => {
    await first.result.current.workspace.create('Personal')
  })
  await waitFor(() => expect(first.result.current.notes.isReady).toBe(true))
  const id = first.result.current.workspace.active.id
  await act(async () => {
    await first.result.current.notes.setValue('Saved locally')
  })
  first.unmount()
  const second = await mountWorkspace()
  expect(second.result.current.workspace.active.id).toBe(id)
  expect(second.result.current.workspace.workspaces).toHaveLength(2)
  expect(second.result.current.notes.value).toBe('Saved locally')
})

it('separates catalogs and records by app ID', async () => {
  const first = await mountWorkspace()
  await act(async () => {
    await first.result.current.notes.setValue('First app only')
  })
  const second = renderHook(useTestWorkspace, {
    wrapper: ({ children }) => (
      <WorkspaceProvider appId="another-app">{children}</WorkspaceProvider>
    )
  })
  await waitFor(() => expect(second.result.current.notes.isReady).toBe(true))
  expect(second.result.current.notes.value).toBe('')
  await act(async () => {
    await second.result.current.workspace.create('Other app')
  })
  expect(first.result.current.workspace.workspaces).toHaveLength(1)
  expect(workspaceDataKey('a:b', 'c', 'd')).not.toBe(
    workspaceDataKey('a', 'b:c', 'd')
  )
})

it('rejects invalid names and unknown selections', async () => {
  const { result } = await mountWorkspace()
  await expect(result.current.workspace.create(' ')).rejects.toThrow(
    'between 1 and 64'
  )
  await expect(result.current.workspace.create('x'.repeat(65))).rejects.toThrow(
    'between 1 and 64'
  )
  act(() => result.current.workspace.select('missing'))
  expect(result.current.workspace.active.id).toBe('default')
})

it('receives current selection changes from another tab', async () => {
  const { result } = await mountWorkspace()
  await act(async () => {
    await result.current.workspace.create('Another tab')
  })
  act(() => {
    localStorage.setItem(
      workspaceSelectionKey('workspace-tests'),
      JSON.stringify('default')
    )
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: workspaceSelectionKey('workspace-tests'),
        storageArea: localStorage
      })
    )
  })
  expect(result.current.workspace.active.id).toBe('default')
})

it('does not switch to a workspace whose database commit failed', async () => {
  const { result } = await mountWorkspace()
  vi.spyOn(IDBObjectStore.prototype, 'put').mockImplementation(() => {
    throw new DOMException('Quota exceeded', 'QuotaExceededError')
  })
  await act(async () => {
    expect(await result.current.workspace.create('Unsaved')).toBeNull()
  })
  expect(result.current.workspace.active.id).toBe('default')
  expect(result.current.workspace.isSaved).toBe(false)
  expect(result.current.workspace.error).toBeTruthy()
})

it('rejects empty catalogs and duplicate IDs', () => {
  const catalog = createInitialWorkspaceCatalog('Demo Workspace')
  expect(() => parseWorkspaceCatalog({ workspaces: [] })).toThrow()
  expect(() =>
    parseWorkspaceCatalog({
      workspaces: [catalog.workspaces[0], catalog.workspaces[0]]
    })
  ).toThrow()
})

it('renames without changing workspace identity or its data and persists the new name', async () => {
  const first = await mountWorkspace()
  await act(async () => {
    await first.result.current.notes.setValue('Keep these notes')
  })
  await act(async () => {
    expect(
      await first.result.current.workspace.rename('default', '  Personal  ')
    ).toBe(true)
  })
  expect(first.result.current.workspace.active).toMatchObject({
    id: 'default',
    name: 'Personal'
  })
  expect(first.result.current.notes.value).toBe('Keep these notes')
  await expect(
    first.result.current.workspace.rename('default', ' ')
  ).rejects.toThrow('between 1 and 64')
  first.unmount()
  const restored = await mountWorkspace()
  expect(restored.result.current.workspace.active.name).toBe('Personal')
})

it('deletes the active workspace, chooses a remaining one, and protects the last workspace', async () => {
  const first = await mountWorkspace()
  await act(async () => {
    expect(await first.result.current.workspace.remove('default')).toBe(false)
  })
  await act(async () => {
    await first.result.current.workspace.create('Remaining workspace')
  })
  const remaining = first.result.current.workspace.active.id
  act(() => first.result.current.workspace.select('default'))
  await waitFor(() => expect(first.result.current.notes.isReady).toBe(true))
  await act(async () => {
    await first.result.current.notes.setValue('Remove these notes')
  })
  await act(async () => {
    expect(await first.result.current.workspace.remove('default')).toBe(true)
  })
  expect(first.result.current.workspace.active.id).toBe(remaining)
  expect(first.result.current.workspace.workspaces).toHaveLength(1)
  await act(async () => {
    expect(await first.result.current.workspace.remove(remaining)).toBe(false)
  })
  first.unmount()
  const restored = await mountWorkspace()
  expect(restored.result.current.workspace.active.id).toBe(remaining)
  expect(restored.result.current.workspace.workspaces).toHaveLength(1)
  expect(restored.result.current.notes.value).toBe('')
})
