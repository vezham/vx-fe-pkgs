import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type SiwePluginOptions,
  siwePlugin as coreSiwePlugin
} from '@vezham/auth-ui-core/plugins/siwe'

import { SignInEthereumButton } from './sign-in-ethereum-button'
import { WalletAccounts } from './wallet-accounts'

export const siwePlugin = createAuthPlugin(
  coreSiwePlugin.id,
  (options: SiwePluginOptions) => ({
    ...coreSiwePlugin(options),
    authButtons: [SignInEthereumButton],
    securityCards: options.walletManager ? [WalletAccounts] : []
  })
)
