import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor
} from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

import type { TamizhiClient } from '@vezham/tamizhi-client'
import type { ToolActivity } from '@vezham/tamizhi-contracts'

import { BotPicker } from './bot-picker'
import {
  getActivityAppearance,
  getTamizhiProfile,
  getTamizhiProfiles
} from './profiles'
import { TamizhiSessionProvider, useTamizhiSession } from './session'
import { useDemoChat } from './use-demo-chat'

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.useRealTimers()
})

it('uses app defaults, supports host-defined profiles, and falls back for unknown app IDs', () => {
  const profiles = getTamizhiProfiles([
    { id: 'vezham-crm', name: 'Sales', persona: 'helper', outfit: 'coach' }
  ])
  expect(getTamizhiProfile('vezham-crm', profiles)).toMatchObject({
    name: 'Sales',
    outfit: 'coach'
  })
  expect(profiles.filter(item => item.id === 'vezham-crm')).toHaveLength(1)
  expect(getTamizhiProfile('unknown-app', profiles).id).toBe('vezham-tamizhi')
})

it('lists app names in the welcome picker, independently of outfit choices', async () => {
  const onSelect = vi.fn()
  const profiles = getTamizhiProfiles()
  render(
    <BotPicker
      headingId="welcome"
      profile={profiles[0]}
      profiles={profiles}
      onSelect={onSelect}
    />
  )
  fireEvent.click(screen.getByRole('button', { name: 'Choose an assistant' }))
  fireEvent.click(await screen.findByRole('menuitemradio', { name: 'CRM' }))
  expect(onSelect).toHaveBeenCalledWith('vezham-crm')
  expect(screen.queryByRole('menuitemradio', { name: 'Chef' })).toBeNull()
})

it('persists selected profiles and manual outfits through history, retries, and branching', () => {
  vi.useFakeTimers()
  const first = renderHook(() => useDemoChat(true))
  act(() => first.result.current.selectProfile('vezham-crm'))
  act(() => {
    first.result.current.configureAppearance({ outfit: 'guard' })
    first.result.current.send('Hello')
  })
  const chatId = first.result.current.activeId ?? ''
  const appearance = {
    outfitLocked: true,
    profileId: 'vezham-crm',
    persona: 'planner',
    outfit: 'guard'
  }
  expect(first.result.current.messages[0]).toMatchObject(appearance)
  expect(first.result.current.messages[1]).toMatchObject(appearance)
  act(() => first.result.current.retry())
  expect(first.result.current.messages[1]).toMatchObject(appearance)
  act(() =>
    first.result.current.branchChat(first.result.current.messages[1].id)
  )
  expect(first.result.current.profile.id).toBe('vezham-crm')
  act(() => first.result.current.newChat())
  act(() => first.result.current.send('Another conversation'))
  expect(first.result.current.messages[0].outfit).toBe('planner')
  act(() => vi.advanceTimersByTime(200))
  first.unmount()
  const restored = renderHook(() => useDemoChat(true, chatId))
  expect(restored.result.current.runOutfitOverride).toBe('guard')
  expect(restored.result.current.profile.id).toBe('vezham-crm')
  expect(restored.result.current.messages[1]).toMatchObject(appearance)
  act(() => restored.result.current.newChat())
})

it('keeps embedded defaults and local histories isolated by app ID', () => {
  vi.useFakeTimers()
  const crm = renderHook(() => useTamizhiSession(), {
    wrapper: ({ children }) => (
      <TamizhiSessionProvider appId="vezham-crm">
        {children}
      </TamizhiSessionProvider>
    )
  })
  const school = renderHook(() => useTamizhiSession(), {
    wrapper: ({ children }) => (
      <TamizhiSessionProvider appId="vezham-school-os">
        {children}
      </TamizhiSessionProvider>
    )
  })
  expect(crm.result.current.chat.profile.name).toBe('CRM')
  expect(school.result.current.chat.profile.name).toBe('School OS')
  act(() => crm.result.current.chat.send('Hello'))
  act(() => vi.advanceTimersByTime(5000))
  expect(crm.result.current.chat.messages[1].outfit).toBe('planner')
  expect(school.result.current.chat.conversations).toHaveLength(0)
})

it('restores the previous activity when concurrent tools finish, without confusing subagent call IDs', () => {
  const profile = getTamizhiProfile('vezham-crm', getTamizhiProfiles())
  const first: ToolActivity = {
    type: 'tool',
    callId: 'same',
    runId: 'parent',
    conversationId: 'chat',
    name: 'mcp_crm_revenue_report',
    input: {}
  }
  const second: ToolActivity = {
    ...first,
    runId: 'child',
    name: 'skill.sales-coaching'
  }
  const complete: ToolActivity = { ...second, type: 'tool-result', output: {} }
  expect(getActivityAppearance(profile, [first, second])?.outfit).toBe('coach')
  expect(
    getActivityAppearance(profile, [first, second, complete])?.outfit
  ).toBe('money')
  expect(
    getActivityAppearance(profile, [
      first,
      second,
      complete,
      { ...first, type: 'tool-result', output: {} }
    ])
  ).toBeUndefined()
})

it('sends profile metadata and applies declared tool appearances only while the tool is active', async () => {
  let finishTool: (() => void) | undefined
  let finishRun: (() => void) | undefined
  const toolDone = new Promise<void>(resolve => {
    finishTool = resolve
  })
  const runDone = new Promise<void>(resolve => {
    finishRun = resolve
  })
  const client: TamizhiClient = {
    models: async () => [],
    conversation: vi.fn(),
    approve: vi.fn(),
    stream: vi.fn(async function* (input) {
      const identity = { runId: 'run', conversationId: input.conversationId }
      yield {
        ...identity,
        type: 'tool' as const,
        callId: 'report',
        name: 'mcp_crm_revenue_report',
        input: {}
      }
      await toolDone
      yield {
        ...identity,
        type: 'tool-result' as const,
        callId: 'report',
        name: 'mcp_crm_revenue_report',
        output: {}
      }
      await runDone
      yield { ...identity, type: 'text' as const, delta: 'Report ready.' }
      yield {
        ...identity,
        type: 'finish' as const,
        reason: 'complete' as const
      }
    })
  }
  const { result } = renderHook(() =>
    useDemoChat(false, undefined, 'profile:remote', client, {
      appId: 'vezham-crm'
    })
  )
  act(() => result.current.send('Show revenue'))
  await waitFor(() =>
    expect(result.current.activityAppearance?.outfit).toBe('money')
  )
  expect(client.stream).toHaveBeenCalledWith(
    expect.objectContaining({
      activityProfiles: expect.objectContaining({
        mcp_crm_revenue_report: { persona: 'planner', outfit: 'money' }
      }),
      messages: [
        expect.objectContaining({
          profileId: 'vezham-crm',
          persona: 'planner',
          outfit: 'planner'
        })
      ]
    }),
    expect.any(AbortSignal)
  )
  act(() => finishTool?.())
  await waitFor(() => expect(result.current.activityAppearance).toBeUndefined())
  expect(result.current.profile.outfit).toBe('planner')
  act(() => finishRun?.())
  await waitFor(() => expect(result.current.isStreaming).toBe(false))
  expect(result.current.messages[1]).toMatchObject({
    profileId: 'vezham-crm',
    persona: 'planner',
    outfit: 'planner'
  })
})

it('honors a host override of the default Tamizhi profile instead of detecting from demo text', () => {
  const { result } = renderHook(() =>
    useDemoChat(true, undefined, 'custom-default', undefined, {
      profiles: [
        {
          id: 'vezham-tamizhi',
          name: 'My assistant',
          persona: 'coder',
          outfit: 'builder'
        }
      ]
    })
  )
  act(() => result.current.send('Hello'))
  expect(result.current.messages[0]).toMatchObject({
    persona: 'coder',
    outfit: 'builder'
  })
  expect(result.current.messages[1]).toMatchObject({
    persona: 'coder',
    outfit: 'builder'
  })
})
