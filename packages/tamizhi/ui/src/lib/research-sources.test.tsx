import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'

import type { ToolActivity } from '@vezham/tamizhi-contracts'

import { ResearchSources } from './research-sources'

const result: ToolActivity = {
  type: 'tool-result',
  runId: 'run',
  conversationId: 'chat',
  callId: 'read',
  name: 'web_read',
  output: {
    url: 'https://react.dev/versions',
    content: 'Read fixture',
    sources: [
      {
        id: 'web-fixture',
        url: 'https://react.dev/versions',
        title: 'React versions',
        domain: 'react.dev',
        retrievedAt: '2026-11-05T00:00:00Z'
      }
    ]
  }
}
it('lists only sources actually read, deduplicating repeated reads', () => {
  render(
    <ResearchSources
      activities={[{ ...result, name: 'web_search' }, result, result]}
    />
  )
  expect(screen.getAllByRole('link')).toHaveLength(1)
  expect(
    screen.getByRole('link', { name: 'React versions' }).getAttribute('href')
  ).toBe('https://react.dev/versions')
})
it('does not claim a source was read from search or failed tool results', () => {
  const { container } = render(
    <ResearchSources
      activities={[
        { ...result, name: 'web_search' },
        { ...result, output: { error: 'denied' } }
      ]}
    />
  )
  expect(container.textContent).toBe('')
})
