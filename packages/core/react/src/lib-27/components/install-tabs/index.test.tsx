import { fireEvent, render, screen } from '@testing-library/react'

import type { DynamicCodeblockProps } from '@vezham/docs-react/components/dynamic-codeblock'

import { InstallTabs } from './index'

vi.mock('@vezham/docs-react/components/dynamic-codeblock', () => ({
  DynamicCodeBlock: ({
    code,
    codeblock
  }: Pick<DynamicCodeblockProps, 'code' | 'codeblock'>) => {
    const Actions = codeblock?.Actions
    return (
      <div>
        <pre>{code}</pre>
        {Actions && <Actions className="" />}
      </div>
    )
  }
}))

const clipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
const execCommand = Object.getOwnPropertyDescriptor(document, 'execCommand')

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) }
  })
})

afterEach(() => {
  if (clipboard) Object.defineProperty(navigator, 'clipboard', clipboard)
  else Reflect.deleteProperty(navigator, 'clipboard')
  if (execCommand) Object.defineProperty(document, 'execCommand', execCommand)
  else Reflect.deleteProperty(document, 'execCommand')
})

describe('InstallTabs', () => {
  it('switches between the four package-manager commands', async () => {
    render(<InstallTabs packages="@vezham/react" />)
    expect(screen.getByRole('tab', { name: 'npm' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(await screen.findByText('npm install @vezham/react')).toBeVisible()
    for (const [manager, command] of [
      ['pnpm', 'pnpm add @vezham/react'],
      ['yarn', 'yarn add @vezham/react'],
      ['bun', 'bun add @vezham/react']
    ]) {
      fireEvent.click(screen.getByRole('tab', { name: manager }))
      expect(await screen.findByText(command)).toBeVisible()
    }
  })

  it('accepts readonly package lists, development dependencies, and a default manager', async () => {
    render(
      <InstallTabs
        packages={['typescript', 'vitest'] as const}
        dev
        defaultManager="pnpm"
      />
    )
    expect(screen.getByRole('tab', { name: 'pnpm' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(
      await screen.findByText('pnpm add -D typescript vitest')
    ).toBeVisible()
  })

  it('copies a standalone command and reports success', async () => {
    render(<InstallTabs.Command command="pnpm add @vezham/react" />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Copy install command' })
    )
    expect(
      await screen.findByRole('button', { name: 'Install command copied' })
    ).toBeVisible()
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'pnpm add @vezham/react'
    )
  })

  it('reports an unavailable clipboard after copy fails', async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(
      new Error('Denied')
    )
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: () => false
    })
    render(<InstallTabs.Command command="npm install @vezham/react" />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Copy install command' })
    )
    expect(
      await screen.findByRole('button', {
        name: 'Unable to copy install command'
      })
    ).toBeVisible()
  })

  it('renders packaged decorative icons by default and hides them with a boolean', () => {
    const view = render(
      <InstallTabs packages="example" label="Choose installer" />
    )
    expect(
      screen.getByRole('tablist', { name: 'Choose installer' })
    ).toBeVisible()
    for (const manager of ['npm', 'pnpm', 'yarn', 'bun']) {
      const image = screen
        .getByRole('tab', { name: manager })
        .querySelector('img')
      expect(image).toHaveAttribute(
        'src',
        expect.stringMatching(/^data:image\/svg\+xml,/)
      )
      expect(image).toHaveAttribute('alt', '')
    }
    view.rerender(
      <InstallTabs
        packages="example"
        label="Choose installer"
        showIcons={false}
      />
    )
    expect(screen.getAllByRole('tab')).toHaveLength(4)
    expect(
      screen
        .getByRole('tablist', { name: 'Choose installer' })
        .querySelectorAll('img')
    ).toHaveLength(0)
  })
})
