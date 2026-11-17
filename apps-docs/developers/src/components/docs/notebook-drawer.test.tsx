import { fireEvent, render, waitFor } from '@testing-library/react'
import type { ComponentProps } from 'react'

import { NotebookDrawerFooter, NotebookDrawerHeader } from './notebook-drawer'
import { NotebookHeader } from './notebook-header'

const { navigate, close } = vi.hoisted(() => ({
  navigate: vi.fn(),
  close: vi.fn()
}))

vi.mock('@tanstack/react-router', async original => ({
  ...(await original<typeof import('@tanstack/react-router')>()),
  useNavigate: () => navigate
}))

vi.mock('@vezham/docs-react/layouts/notebook', () => ({
  useNotebookLayout: () => ({
    navItems: [],
    slots: {
      sidebar: {
        trigger: (props: ComponentProps<'button'>) => (
          <button {...props} onClick={close} />
        )
      }
    }
  })
}))

vi.mock('../brand', () => ({
  Brand: { Link: () => <a href="/">Vezham Developers</a> }
}))

vi.mock('./control-center', () => ({
  ControlCenter: () => <button>ControlCenter</button>
}))

describe('notebook drawer', () => {
  beforeEach(() => vi.clearAllMocks())

  it('uses default controls and allows replacing or hiding them in the footer', () => {
    const view = render(<NotebookDrawerFooter />)
    expect(view.getByRole('button', { name: 'ControlCenter' })).toBeTruthy()
    view.rerender(
      <NotebookDrawerFooter controls={<button>Custom controls</button>} />
    )
    expect(view.queryByRole('button', { name: 'ControlCenter' })).toBeNull()
    expect(view.getByRole('button', { name: 'Custom controls' })).toBeTruthy()
    view.rerender(<NotebookDrawerFooter controls={false} />)
    expect(view.queryByRole('button')).toBeNull()
  })

  it('uses the same default and overrides in the header', () => {
    const view = render(<NotebookHeader locale="en" />)
    expect(view.getByRole('button', { name: 'ControlCenter' })).toBeTruthy()
    view.rerender(
      <NotebookHeader locale="en" controls={<button>Custom controls</button>} />
    )
    expect(view.queryByRole('button', { name: 'ControlCenter' })).toBeNull()
    expect(view.getByRole('button', { name: 'Custom controls' })).toBeTruthy()
    view.rerender(<NotebookHeader locale="en" controls={false} />)
    expect(view.queryByRole('button', { name: 'ControlCenter' })).toBeNull()
    expect(view.queryByRole('button', { name: 'Custom controls' })).toBeNull()
  })

  it.each(['en', 'cn'] as const)(
    'keeps the active section in sync and navigates with the %s locale',
    async locale => {
      const prefix = locale === 'cn' ? '/cn' : ''
      const props = {
        locale,
        sections: [
          {
            id: 'start',
            title: 'Getting Started',
            url: `${prefix}/docs/packages/env/getting-started`
          },
          {
            id: 'guides',
            title: 'Guides',
            url: `${prefix}/docs/packages/env/guides`
          }
        ]
      }
      const view = render(
        <NotebookDrawerHeader {...props} selectedSection="start" />
      )
      const triggers = () =>
        view.getAllByRole('button', { name: /Documentation section/ })
      expect(triggers()[0].textContent).toContain('Getting Started')
      fireEvent.click(triggers()[0])
      fireEvent.click(await view.findByRole('option', { name: 'Guides' }))
      await waitFor(() =>
        expect(navigate).toHaveBeenCalledWith({
          to: `${prefix}/docs/packages/env/guides`
        })
      )
      view.rerender(
        <NotebookDrawerHeader {...props} selectedSection="guides" />
      )
      for (const trigger of triggers())
        expect(trigger.textContent).toContain('Guides')
      fireEvent.click(view.getByRole('button', { name: 'Close sidebar' }))
      expect(close).toHaveBeenCalledOnce()
    }
  )
})
