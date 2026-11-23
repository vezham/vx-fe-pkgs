'use client'

import { siwePlugin } from './plugin'
import { SignInEthereumButton } from './sign-in-ethereum-button'
import { WalletAccounts } from './wallet-accounts'

export type * from './wallet-accounts'
export type * from './plugin'
export type * from './sign-in-ethereum-button'

export const Wallet = Object.assign(WalletAccounts, {
  plugin: siwePlugin,
  SignIn: SignInEthereumButton
})
