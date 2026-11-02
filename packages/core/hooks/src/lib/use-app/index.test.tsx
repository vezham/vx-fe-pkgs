import { cleanup, render, renderHook, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { afterEach, expect, it } from 'vitest'

import { AppContext, type AppIdentity, useApp } from './index'

afterEach(cleanup)

const crm: AppIdentity = {
  id: 'vezham-crm',
  name: 'CRM',
  version: '1',
  environment: 'local',
  runtime: 'vite'
}

it('leaves app identity optional for consumers outside a runtime provider', () => {
  const { result } = renderHook(() => useApp())
  expect(result.current).toBeUndefined()
})

it('updates identity when the provider value changes', () => {
  const Probe = () => <span data-testid="app-id">{useApp()?.id}</span>
  const view = render(
    <AppContext.Provider value={crm}>
      <Probe />
    </AppContext.Provider>
  )
  expect(screen.getByTestId('app-id')).toHaveTextContent('vezham-crm')
  view.rerender(
    <AppContext.Provider value={{ ...crm, id: 'vezham-school-os' }}>
      <Probe />
    </AppContext.Provider>
  )
  expect(screen.getByTestId('app-id')).toHaveTextContent('vezham-school-os')
})

it('isolates nested applications and independent static renders', () => {
  const Probe = () => <span>{useApp()?.id ?? 'unconfigured'}</span>
  const school = { ...crm, id: 'vezham-school-os' }
  expect(
    renderToString(
      <AppContext.Provider value={crm}>
        <Probe />
        <AppContext.Provider value={school}>
          <Probe />
        </AppContext.Provider>
        <Probe />
      </AppContext.Provider>
    )
  ).toBe(
    '<span>vezham-crm</span><span>vezham-school-os</span><span>vezham-crm</span>'
  )
  expect(renderToString(<Probe />)).toBe('<span>unconfigured</span>')
})
