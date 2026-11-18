import { render, screen } from '@testing-library/react'

import { DocsVideoPlayer } from './docs-video-player'

const theme = vi.hoisted(() => ({ resolvedTheme: 'dark' }))

vi.mock('@vezham/docs-react/provider/base', () => ({ useTheme: () => theme }))

describe('docs video sources', () => {
  beforeEach(() => {
    theme.resolvedTheme = 'dark'
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(
      () => undefined
    )
  })
  afterEach(() => vi.restoreAllMocks())

  it('keeps unavailable upstream dark recordings on the light source', () => {
    render(
      <DocsVideoPlayer
        srcLight="https://example.com/scroll-shadow-docs-light.mp4"
        srcDark="https://example.com/scroll-shadow-docs-dark.mp4"
      />
    )
    expect(
      screen.getByLabelText('HeroUI component demonstration')
    ).toHaveAttribute('src', 'https://example.com/scroll-shadow-docs-light.mp4')
  })

  it('uses the docs provider theme for other recordings', () => {
    const view = render(
      <DocsVideoPlayer srcLight="/light.mp4" srcDark="/dark.mp4" />
    )
    expect(
      screen.getByLabelText('HeroUI component demonstration')
    ).toHaveAttribute('src', '/dark.mp4')

    theme.resolvedTheme = 'light'
    view.rerender(<DocsVideoPlayer srcLight="/light.mp4" srcDark="/dark.mp4" />)
    expect(
      screen.getByLabelText('HeroUI component demonstration')
    ).toHaveAttribute('src', '/light.mp4')
  })
})
