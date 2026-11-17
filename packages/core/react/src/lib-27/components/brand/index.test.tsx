import { render, screen } from '@testing-library/react'

import { Brand } from './index'

vi.mock('@vezham/env/vite', () => ({
  APP_BRAND_NAME: 'Developer Portal',
  APP_BRAND_CHANNEL: 'intra'
}))

describe('Brand', () => {
  it('uses the name and channel supplied by env', () => {
    render(<Brand />)

    expect(screen.getByText('Developer Portal')).toBeInTheDocument()
    expect(screen.getByText('Internal')).toBeInTheDocument()
  })

  it('allows props to override env and hide the channel', () => {
    render(<Brand name="Custom Brand" channel="" />)

    expect(screen.getByText('Custom Brand')).toBeInTheDocument()
    expect(screen.queryByText('Developer Portal')).not.toBeInTheDocument()
    expect(screen.queryByText('Internal')).not.toBeInTheDocument()
  })
})
