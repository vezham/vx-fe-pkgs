// vx-bot/NOTE: Reuse the base configuration for Node-only tests.
// eslint-disable-next-line @vx-lint/wildcard-barrel
export { defineConfig } from '../vite/index'
export * from '../../framework'
export * from './framework'
