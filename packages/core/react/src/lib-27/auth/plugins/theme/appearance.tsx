import {
  ThemePreviewDark,
  ThemePreviewLight,
  ThemePreviewSystem,
  useAuthPlugin
} from '@vezham/auth-ui-react'
import { Monitor as Display, Moon, Sun } from '@vezham/icons-react'
import {
  Card,
  type CardProps,
  Label,
  Radio,
  RadioGroup,
  cn,
  useIsHydrated
} from '@vezham/react-v3'

import { themePluginBase } from '../../lib/theme-plugin-base'

export type AppearanceProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Renders a theme selector card with visual theme previews.
 *
 * Displays a card containing radio buttons for selecting between system, light,
 * and dark themes. Each option shows a visual preview of the theme. Theme options
 * are conditionally shown based on the `themes` array provided via the theme plugin.
 */
export const Appearance = ({
  className,
  variant,
  ...props
}: AppearanceProps & Omit<CardProps, 'children'>) => {
  const { useTheme, localization } = useAuthPlugin(themePluginBase)
  const { theme, setTheme, themes = [] } = useTheme()
  const hydrated = useIsHydrated()

  return (
    <div>
      <h2 className={cn('mb-3 text-sm font-semibold')}>
        {localization.appearance}
      </h2>

      <Card className={cn('gap-4 p-4', className)} variant={variant} {...props}>
        <Card.Content>
          <Label>{localization.theme}</Label>

          <RadioGroup
            variant={variant === 'transparent' ? 'secondary' : 'primary'}
            value={hydrated ? theme : ''}
            onChange={setTheme}
            isDisabled={!hydrated || !theme}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {themes.includes('system') && (
                <Radio
                  value="system"
                  className={cn(
                    'mt-0 rounded-xl px-4 pt-3 pb-4',
                    'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 border border-transparent',
                    'data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10',
                    variant === 'transparent'
                      ? 'bg-surface'
                      : 'bg-surface-secondary'
                  )}>
                  <Radio.Content className="gap-2">
                    <div className="flex justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <Display size={16} className="text-muted" />
                        {localization.system}
                      </span>

                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                    </div>

                    <ThemePreviewSystem className="w-full" />
                  </Radio.Content>
                </Radio>
              )}

              {themes.includes('light') && (
                <Radio
                  value="light"
                  className={cn(
                    'mt-0 rounded-xl px-4 pt-3 pb-4',
                    'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 border border-transparent',
                    'data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10',
                    variant === 'transparent'
                      ? 'bg-surface'
                      : 'bg-surface-secondary'
                  )}>
                  <Radio.Content className="gap-2">
                    <div className="flex justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <Sun size={16} className="text-muted" />
                        {localization.light}
                      </span>

                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                    </div>

                    <ThemePreviewLight className="w-full" />
                  </Radio.Content>
                </Radio>
              )}

              {themes.includes('dark') && (
                <Radio
                  value="dark"
                  className={cn(
                    'mt-0 rounded-xl px-4 pt-3 pb-4',
                    'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 border border-transparent',
                    'data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10',
                    variant === 'transparent'
                      ? 'bg-surface'
                      : 'bg-surface-secondary'
                  )}>
                  <Radio.Content className="gap-2">
                    <div className="flex justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <Moon size={16} className="text-muted" />
                        {localization.dark}
                      </span>

                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                    </div>

                    <ThemePreviewDark className="w-full" />
                  </Radio.Content>
                </Radio>
              )}
            </div>
          </RadioGroup>
        </Card.Content>
      </Card>
    </div>
  )
}
