import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'

import {
  ColorSectionFormField,
  ColorSectionSideBySide,
  ColorSectionStacked
} from './color-sections'

describe('imported color documentation', () => {
  it('renders the separate light and dark token collections', () => {
    render(
      <ColorSectionStacked
        lightColors={[
          { label: 'Light surface', variable: '--surface', cssValue: '#fff' }
        ]}
        darkColors={[
          { label: 'Dark surface', variable: '--surface', cssValue: '#111' }
        ]}
      />
    )
    expect(
      screen.getByRole('button', { name: 'Copy Light surface color' })
    ).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'Copy Dark surface color' })
    ).toBeVisible()
  })

  it('includes hover, soft, placeholder, and foreground swatches', () => {
    render(
      <>
        <ColorSectionSideBySide
          name="Accent"
          baseVariable="--accent"
          hoverVariable="--accent"
          hoverCssValue="red"
          foregroundVariable="--accent-foreground"
          soft={{
            baseVariable: '--accent-soft',
            hoverVariable: '--accent-soft',
            foregroundVariable: '--accent-soft-foreground'
          }}
        />
        <ColorSectionFormField
          colors={{
            bg: '--field-background',
            bgHover: 'red',
            placeholder: '--field-placeholder',
            foreground: '--field-foreground'
          }}
        />
      </>
    )
    for (const theme of ['Light', 'Dark']) {
      const palette = within(
        screen.getByRole('region', { name: `${theme} Accent colors` })
      )
      expect(palette.getByText('Accent Soft')).toBeVisible()
      expect(
        palette.getAllByRole('button', { name: 'Copy Hover color' })
      ).toHaveLength(2)
      expect(
        palette.getAllByRole('button', { name: 'Copy Foreground color' })
      ).toHaveLength(2)
    }
    expect(
      screen.getAllByRole('button', { name: 'Copy Placeholder color' })
    ).toHaveLength(2)
  })

  it('copies the computed swatch color', async () => {
    const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    })
    try {
      render(
        <ColorSectionStacked
          lightColors={[
            { label: 'Red', variable: '--accent', cssValue: 'rgb(255, 0, 0)' }
          ]}
          darkColors={[]}
        />
      )
      fireEvent.click(screen.getByRole('button', { name: 'Copy Red color' }))
      await waitFor(() =>
        expect(writeText).toHaveBeenCalledWith('rgb(255, 0, 0)')
      )
    } finally {
      if (descriptor) Object.defineProperty(navigator, 'clipboard', descriptor)
      else Reflect.deleteProperty(navigator, 'clipboard')
    }
  })
})
