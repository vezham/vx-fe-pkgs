import { useRef, useState } from 'react'

import { Button, Tooltip } from '@vezham/react-v3'

type Swatch = {
  label: string
  variable: string
  cssValue?: string
  textColor?: string
  border?: boolean
  tooltip?: string
}

type ColorGroup = {
  baseVariable: string
  baseCssValue?: string
  baseTooltip?: string
  hoverVariable: string
  hoverCssValue?: string
  hoverTooltip?: string
  foregroundVariable: string
  foregroundCssValue?: string
  foregroundTooltip?: string
}

type FieldColors = {
  bg: string
  bgTooltip?: string
  bgHover: string
  bgHoverTooltip?: string
  bgFocusTooltip?: string
  placeholder: string
  placeholderTooltip?: string
  foreground: string
  foregroundTooltip?: string
}

const colorValue = (value: string) =>
  value.startsWith('--') ? `var(${value})` : value

const inferTextColor = (variable: string) => {
  if (variable === '--foreground') return '--background'
  if (variable === '--background') return '--foreground'
  if (variable === '--white' || variable === '--snow') return '--eclipse'
  if (variable === '--black' || variable === '--eclipse') return '--snow'
  if (variable === '--backdrop') return '--snow'
  if (variable === '--link') return '--background'
  if (variable === '--overlay') return '--overlay-foreground'
  if (variable === '--segment') return '--foreground'
  if (variable === '--surface') return '--surface-foreground'
  if (variable.startsWith('--surface-')) return '--surface-foreground'
  if (variable === '--default') return '--default-foreground'
  if (variable === '--accent') return '--accent-foreground'
  if (variable === '--success') return '--success-foreground'
  if (variable === '--warning') return '--warning-foreground'
  if (variable === '--danger') return '--danger-foreground'
  if (variable.endsWith('-foreground')) {
    return variable.slice(0, -'-foreground'.length)
  }
  return '--foreground'
}

const ColorSwatch = ({
  label,
  variable,
  cssValue,
  textColor,
  border,
  tooltip,
  compact = false
}: Swatch & { compact?: boolean }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [status, setStatus] = useState('')
  const background = colorValue(cssValue ?? variable)
  return (
    <Tooltip delay={0}>
      <Button
        ref={ref}
        aria-label={`Copy ${label} color`}
        variant="ghost"
        className={`h-auto w-full min-w-0 flex-col items-start justify-center gap-1 rounded-xl text-start ${compact ? 'min-h-10 px-4 py-2.5' : 'min-h-14 px-4 py-2'} ${border ? 'border-border border' : ''}`}
        style={{ backgroundColor: background }}
        onPress={async () => {
          if (!ref.current) return
          try {
            await navigator.clipboard.writeText(
              getComputedStyle(ref.current).backgroundColor
            )
            setStatus('Copied color value')
          } catch {
            setStatus(`Color token: ${cssValue ?? variable}`)
          }
        }}>
        <span
          className="block max-w-full text-sm font-medium tracking-tight break-words"
          style={{ color: colorValue(textColor ?? inferTextColor(variable)) }}>
          {label}
        </span>
        <span className="sr-only" role="status">
          {status}
        </span>
      </Button>
      <Tooltip.Content className="max-w-xs font-mono text-xs whitespace-pre-wrap">
        {status || tooltip || cssValue || variable}
      </Tooltip.Content>
    </Tooltip>
  )
}

const ThemeTag = ({ theme }: { theme: 'Light' | 'Dark' }) => (
  <span className="text-muted inline-flex w-fit items-center text-xs font-medium">
    {theme}
  </span>
)

const ColorHeader = ({
  name,
  variable,
  foregroundVariable,
  theme,
  tooltip
}: {
  name: string
  variable: string
  foregroundVariable: string
  theme: 'Light' | 'Dark'
  tooltip?: string
}) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [status, setStatus] = useState('')
  return (
    <Tooltip delay={0}>
      <Button
        ref={ref}
        aria-label={`Copy ${name} color for ${theme} theme`}
        variant="ghost"
        className="flex h-auto min-h-14 w-full min-w-0 items-center justify-between rounded-xl px-4 py-3 text-start"
        style={{ backgroundColor: colorValue(variable) }}
        onPress={async () => {
          try {
            if (!ref.current) return
            await navigator.clipboard.writeText(
              getComputedStyle(ref.current).backgroundColor
            )
            setStatus('Copied color value')
          } catch {
            setStatus(`Color token: ${variable}`)
          }
        }}>
        <span
          className="text-lg font-medium tracking-tight"
          style={{ color: colorValue(foregroundVariable) }}>
          {name}
        </span>
        <span
          className="text-xs font-medium"
          style={{ color: colorValue(foregroundVariable) }}>
          {theme}
        </span>
      </Button>
      <Tooltip.Content className="max-w-xs font-mono text-xs whitespace-pre-wrap">
        {status || tooltip || variable}
      </Tooltip.Content>
    </Tooltip>
  )
}

const ColorBlock = ({
  name,
  group,
  theme,
  soft = false
}: {
  name: string
  group: ColorGroup
  theme: 'light' | 'dark'
  soft?: boolean
}) => {
  const base = colorValue(group.baseCssValue ?? group.baseVariable)
  const foreground = colorValue(
    group.foregroundCssValue ?? group.foregroundVariable
  )
  const tokens: Swatch[] = [
    {
      label: 'Hover',
      variable: group.hoverVariable,
      cssValue: group.hoverCssValue,
      textColor: soft ? '--foreground' : foreground,
      tooltip: group.hoverTooltip
    },
    {
      label: 'Foreground',
      variable: group.foregroundVariable,
      cssValue: group.foregroundCssValue,
      textColor: soft
        ? inferTextColor(group.foregroundVariable)
        : group.baseVariable,
      tooltip: group.foregroundTooltip
    }
  ]

  return (
    <div
      className={`relative flex min-w-0 flex-1 flex-col gap-1.5 overflow-hidden rounded-xl p-3 ${soft ? 'border border-black/10 dark:border-white/10' : ''}`}
      data-theme={theme}
      style={soft ? undefined : { backgroundColor: base }}>
      {soft && (
        <>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--surface)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor:
                group.baseCssValue ?? colorValue(group.baseVariable)
            }}
          />
        </>
      )}
      <span
        className="relative text-base font-medium tracking-tight"
        style={soft ? { color: 'var(--foreground)' } : { color: foreground }}>
        {soft ? `${name} Soft` : name}
      </span>
      <div className="relative flex min-w-0 flex-col gap-1.5">
        {tokens.map(token => (
          <ColorSwatch key={token.label} {...token} compact />
        ))}
      </div>
    </div>
  )
}

const ThemeColumn = ({
  name,
  group,
  soft,
  theme
}: {
  name: string
  group: ColorGroup
  soft?: ColorGroup
  theme: 'Light' | 'Dark'
}) => {
  const themeValue = theme.toLowerCase() as 'light' | 'dark'
  return (
    <section
      className="flex min-w-0 flex-1 flex-col gap-2"
      data-theme={themeValue}
      style={{ backgroundColor: 'transparent' }}
      aria-label={`${theme} ${name} colors`}>
      <ColorHeader
        name={name}
        variable={group.baseVariable}
        foregroundVariable={group.foregroundVariable}
        theme={theme}
        tooltip={group.baseTooltip}
      />
      <div
        className={`flex min-w-0 flex-col gap-2 ${soft ? 'sm:flex-row' : ''}`}>
        <ColorBlock name={name} group={group} theme={themeValue} />
        {soft && (
          <ColorBlock name={name} group={soft} theme={themeValue} soft />
        )}
      </div>
    </section>
  )
}

export const ColorSectionSideBySide = ({
  name,
  soft,
  ...group
}: ColorGroup & { name: string; soft?: ColorGroup }) => (
  <div className="not-prose my-4 flex min-w-0 flex-col gap-4 sm:flex-row">
    <ThemeColumn name={name} group={group} soft={soft} theme="Light" />
    <ThemeColumn name={name} group={group} soft={soft} theme="Dark" />
  </div>
)

const ThemeSwatches = ({
  theme,
  colors
}: {
  theme: 'light' | 'dark'
  colors: Swatch[]
}) => (
  <section
    data-theme={theme}
    className="min-w-0 space-y-2"
    style={{ backgroundColor: 'transparent' }}
    aria-label={`${theme} color tokens`}>
    <ThemeTag theme={theme === 'light' ? 'Light' : 'Dark'} />
    <div className="flex min-w-0 flex-wrap gap-2 sm:flex-nowrap">
      {colors.map(color => (
        <div
          key={`${color.variable}:${color.label}`}
          className="min-w-0 basis-full sm:flex-1 sm:basis-0">
          <ColorSwatch {...color} />
        </div>
      ))}
    </div>
  </section>
)

export const ColorSectionStacked = ({
  lightColors,
  darkColors
}: {
  lightColors: Swatch[]
  darkColors: Swatch[]
}) => (
  <div className="not-prose my-4 flex flex-col gap-2">
    <ThemeSwatches theme="light" colors={lightColors} />
    <ThemeSwatches theme="dark" colors={darkColors} />
  </div>
)

export const ColorSectionFormField = ({ colors }: { colors: FieldColors }) => {
  const renderTheme = (theme: 'light' | 'dark') => (
    <section
      key={theme}
      data-theme={theme}
      className="min-w-0 space-y-2"
      style={{ backgroundColor: 'transparent' }}>
      <ThemeTag theme={theme === 'light' ? 'Light' : 'Dark'} />
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
        <div
          className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-xl border border-black/10 p-3 dark:border-white/10"
          style={{ backgroundColor: colorValue(colors.bg) }}>
          <span
            className="text-base font-medium tracking-tight"
            style={{ color: colorValue(colors.foreground) }}>
            Bg
          </span>
          <ColorSwatch
            label="Hover"
            variable={colors.bg}
            cssValue={colors.bgHover}
            textColor={colors.foreground}
            tooltip={colors.bgHoverTooltip}
            compact
          />
          <ColorSwatch
            label="Focus"
            variable={colors.bg}
            textColor={colors.foreground}
            tooltip={colors.bgFocusTooltip}
            compact
          />
        </div>
        <div className="flex min-w-0 flex-row gap-2 sm:w-40 sm:flex-col">
          <div className="min-w-0 flex-1">
            <ColorSwatch
              label="Placeholder"
              variable={colors.placeholder}
              textColor="--foreground"
              tooltip={colors.placeholderTooltip}
            />
          </div>
          <div className="min-w-0 flex-1">
            <ColorSwatch
              label="Foreground"
              variable={colors.foreground}
              textColor="--background"
              tooltip={colors.foregroundTooltip}
            />
          </div>
        </div>
      </div>
    </section>
  )

  return (
    <div className="not-prose my-4 flex min-w-0 flex-col gap-2">
      {renderTheme('light')}
      {renderTheme('dark')}
    </div>
  )
}

export const ColorSectionPrimitive = ({ colors }: { colors: Swatch[] }) => (
  <div className="not-prose my-4 flex min-w-0 flex-wrap gap-2 sm:flex-nowrap">
    {colors.map(color => (
      <div
        key={`${color.variable}:${color.label}`}
        className="min-w-0 basis-full sm:flex-1 sm:basis-0">
        <ColorSwatch {...color} />
      </div>
    ))}
  </div>
)
