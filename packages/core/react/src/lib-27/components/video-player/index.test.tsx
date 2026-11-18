import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { VideoPlayer } from './index'

describe('VideoPlayer', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(
      () => undefined
    )
  })
  afterEach(() => vi.restoreAllMocks())

  it('selects themed sources and falls back to the available recording', () => {
    const view = render(
      <VideoPlayer srcLight="/light.mp4" srcDark="/dark.mp4" controls />
    )
    const video = screen.getByLabelText('Video')
    expect(video).toHaveAttribute('src', '/light.mp4')
    expect(screen.queryByRole('group', { name: 'Video controls' })).toBeNull()

    view.rerender(
      <VideoPlayer
        srcLight="/light.mp4"
        srcDark="/dark.mp4"
        theme="dark"
        controls
      />
    )
    expect(video).toHaveAttribute('src', '/dark.mp4')

    view.rerender(<VideoPlayer srcLight="/light.mp4" theme="dark" controls />)
    expect(video).toHaveAttribute('src', '/light.mp4')
  })

  it('keeps controls and callbacks in sync with media events', () => {
    const onPlayingChange = vi.fn()
    render(<VideoPlayer src="/video.mp4" onPlayingChange={onPlayingChange} />)
    const video = screen.getByLabelText<HTMLVideoElement>('Video')

    fireEvent.play(video)
    expect(onPlayingChange).toHaveBeenLastCalledWith(true)
    expect(screen.getByRole('button', { name: 'Pause' })).toBeVisible()

    fireEvent.pause(video)
    expect(onPlayingChange).toHaveBeenLastCalledWith(false)
    expect(screen.getByRole('button', { name: 'Play' })).toBeVisible()

    act(() => {
      video.muted = true
      fireEvent.volumeChange(video)
    })
    expect(screen.getByRole('button', { name: 'Unmute' })).toBeVisible()
  })

  it('retries muted when the browser blocks audible playback', async () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockRejectedValueOnce(new DOMException('Blocked', 'NotAllowedError'))
      .mockResolvedValue(undefined)
    render(<VideoPlayer src="/video.mp4" autoPlay={false} />)

    fireEvent.click(screen.getByRole('button', { name: 'Play' }))

    await waitFor(() => expect(play).toHaveBeenCalledTimes(2))
    expect(screen.getByLabelText<HTMLVideoElement>('Video').muted).toBe(true)
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
