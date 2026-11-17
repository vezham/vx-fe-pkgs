import { fireEvent, render } from '@testing-library/react'

import { ControlCenter } from './control-center'

const { location, navigate } = vi.hoisted(() => ({
  location: { pathname: '/', lang: undefined as string | undefined },
  navigate: vi.fn()
}))

vi.mock('@tanstack/react-router', async original => ({
  ...(await original<typeof import('@tanstack/react-router')>()),
  useParams: () => ({ lang: location.lang }),
  useRouterState: () => location.pathname,
  useRouter: () => ({
    navigate,
    buildLocation: ({ to }: { to: string }) => ({ href: to })
  })
}))

vi.mock('@vezham/docs-react/provider/base', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: vi.fn() })
}))

vi.mock('@vezham/react/control-center', () => ({
  ConfiguredControlCenter: ({
    context
  }: {
    context: {
      language: {
        value: string
        options: { value: string; href: string }[]
        onChange: (value: string) => void
      }
    }
  }) => (
    <>
      <select
        aria-label="Language"
        value={context.language.value}
        onChange={event => context.language.onChange(event.target.value)}>
        {context.language.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      {context.language.options.map(option => (
        <a key={option.value} href={option.href}>
          {option.value}
        </a>
      ))}
    </>
  )
}))

describe('route-aware ControlCenter', () => {
  beforeEach(() => navigate.mockClear())

  it.each([
    '/docs/ui/react-v3/web/getting-started',
    '/docs/ui/react-pro-v3/native/getting-started',
    '/docs/assets/illustrations/accelerometer',
    '/docs/assets/guides/react',
    '/docs/packages/hooks/guides',
    '/handbook/markdown',
    '/'
  ])('switches languages on the current page at %s', path => {
    location.pathname = path
    location.lang = undefined
    const view = render(<ControlCenter />)
    expect(view.getByRole('combobox', { name: 'Language' })).toHaveValue('en')
    expect(view.getByRole('link', { name: 'cn' })).toHaveAttribute(
      'href',
      `/cn${path}`
    )
    fireEvent.change(view.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'cn' }
    })
    expect(navigate).toHaveBeenLastCalledWith({ to: `/cn${path}` })

    location.pathname = `/cn${path}`
    location.lang = 'cn'
    view.rerender(<ControlCenter />)
    expect(view.getByRole('combobox', { name: 'Language' })).toHaveValue('cn')
    expect(view.getByRole('link', { name: 'en' })).toHaveAttribute('href', path)
    fireEvent.change(view.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'en' }
    })
    expect(navigate).toHaveBeenLastCalledWith({ to: path })
  })
})
