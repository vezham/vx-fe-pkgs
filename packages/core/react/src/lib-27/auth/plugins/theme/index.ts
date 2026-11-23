'use client'

import { Appearance } from './appearance'
import { themePlugin } from './plugin'
import { ThemeToggleItem } from './theme-toggle-item'

export type * from './appearance'
export type * from './plugin'
export type * from './theme-toggle-item'

export const AuthTheme = Object.assign(Appearance, {
  plugin: themePlugin,
  ToggleItem: ThemeToggleItem
})
