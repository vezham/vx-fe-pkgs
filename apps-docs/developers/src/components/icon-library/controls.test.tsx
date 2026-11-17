import { render } from '@testing-library/react'

import { CdnIcon } from './controls'

vi.mock('../../lib/icon-library/runtime', () => ({
  applyIconSecondaryColor: vi.fn()
}))

it('disconnects the duotone observer when weight changes and on unmount', () => {
  if (!customElements.get('vx-icon'))
    customElements.define(
      'vx-icon',
      class extends HTMLElement {
        constructor() {
          super()
          this.attachShadow({ mode: 'open' })
        }
      }
    )
  const observe = vi.spyOn(MutationObserver.prototype, 'observe')
  const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect')
  const { container, rerender, unmount } = render(
    <CdnIcon name="align-bottom" weight="duotone-filled" />
  )
  expect(observe).toHaveBeenCalledWith(
    container.querySelector('vx-icon')?.shadowRoot,
    { childList: true, subtree: true }
  )
  rerender(<CdnIcon name="align-bottom" weight="outline" />)
  expect(disconnect).toHaveBeenCalledTimes(1)
  rerender(<CdnIcon name="align-bottom" weight="duotone-outline" />)
  unmount()
  expect(disconnect).toHaveBeenCalledTimes(2)
  vi.restoreAllMocks()
})
