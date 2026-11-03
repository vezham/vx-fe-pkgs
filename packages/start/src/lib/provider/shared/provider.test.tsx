import { useQueryClient } from '@tanstack/react-query'
import { cleanup, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useApp } from '@vezham/hooks'

import { defineConfig } from '../next'
import { ClientDevtools } from './devtools'
import { createProvider } from './provider'

vi.mock('@vezham/use-logger', () => ({ defineLogger: vi.fn() }))
vi.mock('@vezham/env/next', () => ({
  APP_ID: 'test',
  APP_NAME: 'Test',
  APP_VER: '1'
}))
vi.mock('../next/provider', () => ({
  Provider: ({ children }: { children: ReactNode }) => children
}))
vi.mock('@vezham/devtools', () => ({
  Devtools: ({ query = true }: { query?: boolean }) => (
    <span data-testid="devtools">{String(query)}</span>
  )
}))

afterEach(cleanup)
const app = {
  id: 'test',
  name: 'Test',
  version: '1',
  environment: 'development',
  runtime: 'tanstack' as const
}
const env = {
  APP_ID: app.id,
  APP_NAME: app.name,
  APP_VER: app.version,
  APP_ENV: app.environment,
  __DEV__: true,
  __DEBUG__: false
}

describe('provider query isolation', () => {
  it('disables standalone query devtools without a query provider', async () => {
    render(<ClientDevtools app={app} env />)
    expect(await screen.findByText('false')).toBeTruthy()
  })

  it('enables standalone query devtools when a query provider is present', async () => {
    const Provider = createProvider({ env })
    render(
      <Provider>
        <ClientDevtools app={app} env />
      </Provider>
    )
    expect(await screen.findByText('true')).toBeTruthy()
  })

  it('does not share a query cache across server renders', () => {
    const Provider = createProvider({ env })
    const Probe = ({ write = false }: { write?: boolean }) => {
      const client = useQueryClient()
      if (write) client.setQueryData(['user'], 'first-request')
      return <span>{client.getQueryData<string>(['user']) ?? 'empty'}</span>
    }
    expect(
      renderToString(
        <Provider>
          <Probe write />
        </Provider>
      )
    ).toContain('first-request')
    expect(
      renderToString(
        <Provider>
          <Probe />
        </Provider>
      )
    ).toContain('empty')
  })

  it('retains cached data across client rerenders', () => {
    const Provider = createProvider({ env })
    const Probe = ({ write = false }: { write?: boolean }) => {
      const client = useQueryClient()
      if (write) client.setQueryData(['value'], 'retained')
      return <span>{client.getQueryData<string>(['value']) ?? 'empty'}</span>
    }
    const view = render(
      <Provider>
        <Probe write />
      </Provider>
    )
    view.rerender(
      <Provider>
        <Probe />
      </Provider>
    )
    expect(screen.getByText('retained')).toBeTruthy()
  })

  it('passes disabled query state through to client devtools', async () => {
    const Provider = createProvider({
      env,
      renderDevtools: ({ app, query }) => (
        <ClientDevtools app={app} env query={query} />
      )
    })
    render(<Provider query={false} />)
    expect(await screen.findByText('false')).toBeTruthy()
  })

  it('passes application metadata to devtools', async () => {
    const Provider = createProvider({
      env,
      renderDevtools: ({ app: metadata }) => (
        <span>{`${metadata.id}:${metadata.runtime}`}</span>
      )
    })
    render(<Provider runtime="tanstack-docs" />)
    expect(await screen.findByText('test:tanstack-docs')).toBeTruthy()
  })
})

it('honors Next document language and defaults to English', () => {
  expect(renderToString(defineConfig({ lang: 'ta' }))).toContain('lang="ta"')
  expect(renderToString(defineConfig({}))).toContain('lang="en"')
})

it.each(['vite', 'tanstack', 'tanstack-docs', 'next'] as const)(
  'provides resolved app identity for %s without query providers',
  runtime => {
    const Provider = createProvider({ env })
    const Probe = () => (
      <span data-testid="app-identity">{JSON.stringify(useApp())}</span>
    )
    const view = render(
      <Provider runtime={runtime} query={false}>
        <Probe />
      </Provider>
    )
    expect(
      JSON.parse(screen.getByTestId('app-identity').textContent ?? '{}')
    ).toEqual({ ...app, runtime })
    view.rerender(
      <Provider
        id="vezham-crm"
        name="CRM"
        version="2"
        runtime={runtime}
        query={false}>
        <Probe />
      </Provider>
    )
    expect(
      JSON.parse(screen.getByTestId('app-identity').textContent ?? '{}')
    ).toEqual({ ...app, id: 'vezham-crm', name: 'CRM', version: '2', runtime })
  }
)

it('keeps runtime app identities isolated across static renders', () => {
  const Provider = createProvider({ env })
  const Probe = () => <span>{useApp()?.id}</span>
  expect(
    renderToString(
      <Provider id="vezham-crm" query={false}>
        <Probe />
      </Provider>
    )
  ).toContain('vezham-crm')
  const markup = renderToString(
    <Provider query={false}>
      <Probe />
    </Provider>
  )
  expect(markup).toContain('test')
  expect(markup).not.toContain('vezham-crm')
})
