import { createAuthPlugin } from '../../lib/create-auth-plugin'
import {
  type MultiSessionLocalization,
  multiSessionLocalization
} from './multi-session-localization'

export type MultiSessionPluginOptions = {
  /**
   * Override the plugin's default localization strings.
   * @remarks `MultiSessionLocalization`
   */
  localization?: Partial<MultiSessionLocalization>
}

export const multiSessionPlugin = createAuthPlugin(
  'multiSession',
  (options: MultiSessionPluginOptions = {}) => ({
    localization: { ...multiSessionLocalization, ...options.localization }
  })
)
