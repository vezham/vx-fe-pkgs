import type { ComponentType, ReactNode } from 'react'

import type {
  AdditionalField as AdditionalFieldConfig,
  AdditionalFieldFormValue
} from '@vezham/auth-ui-core'
import type {
  AccountCardProps,
  AuthPlugin as AuthPluginPrimitive,
  AuthPluginComponents as BaseAuthPluginComponents,
  OrganizationCardProps,
  SecurityCardProps,
  UserMenuItemProps
} from '@vezham/auth-ui-react'
import type { CardProps } from '@vezham/react-v3'

import type { SocialLayout } from '../provider-buttons'

/** Props for the heroui `<AdditionalField>` component and `field.render` callbacks. */
export type AdditionalFieldProps = {
  name: string
  field: AdditionalFieldConfig
  value: AdditionalFieldFormValue
  onBlur: () => void
  onChange: (value: AdditionalFieldFormValue) => void
  isInvalid?: boolean
  errors?: unknown[]
  isPending?: boolean
  /** Complete suffix appended to labels for fields that are not required. */
  optionalLabel?: string
  variant?: CardProps['variant']
}

// vx-bot/NOTE: Lives here (rather than next to `<AdditionalField>`) so the augmentation
// vx-bot/NOTE: is picked up by consumers who only import from `/plugins`.
declare module '@vezham/auth-ui-core' {
  interface AuthPluginRegister {
    vezham: AuthPlugin
  }

  interface AdditionalFieldRegister {
    label: ReactNode
    renderProps: AdditionalFieldProps
    renderResult: ReactNode
  }
}

/** Vezham slot component shapes — inherits from the framework-agnostic defaults and narrows slots that receive a heroui variant from the host. */
export type AuthPluginComponents = Omit<
  BaseAuthPluginComponents,
  'securityCards' | 'accountCards' | 'organizationCards'
> & {
  /** Rendered as cards inside security settings */
  securityCards?: ComponentType<
    SecurityCardProps & { variant?: CardProps['variant'] }
  >[]
  /** Rendered as cards inside account settings */
  accountCards?: ComponentType<
    AccountCardProps & { variant?: CardProps['variant'] }
  >[]
  /** Rendered as cards inside the active organization's settings */
  organizationCards?: ComponentType<
    OrganizationCardProps & { variant?: CardProps['variant'] }
  >[]
  /** Rendered as items inside the `UserButton` dropdown (e.g. account switcher). */
  userMenuItems?: ComponentType<UserMenuItemProps>[]
}

/** Props the heroui `<Auth>` router passes to plugin-contributed auth views. */
export type AuthViewProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: 'top' | 'bottom'
  variant?: CardProps['variant']
}

/** Props the heroui `<Settings>` router spreads onto plugin-contributed settings views. */
export type SettingsViewProps = Omit<CardProps, 'children'>

/** Vezham plugin type. Plugin authors import this from `@vezham/react/auth`. */
export type AuthPlugin = AuthPluginPrimitive<
  AuthPluginComponents,
  AuthViewProps,
  SettingsViewProps,
  AccountCardProps & { variant?: CardProps['variant'] }
>
