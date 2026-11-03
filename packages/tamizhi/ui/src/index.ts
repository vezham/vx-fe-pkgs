export { TamizhiChat, type TamizhiChatProps } from './lib/chat'
export { TamizhiEmbed } from './lib/embed'
export {
  TamizhiSessionProvider,
  type TamizhiSessionProviderProps
} from './lib/session'
export { Companion } from './lib/companion'
export { EXAMPLES } from './lib/demo'
export { useTamizhiChat } from './lib/use-tamizhi-chat'

export { useTamizhiSession } from './lib/session'
export { ModelPicker, FastModeToggle } from './lib/model-picker'
export { PermissionPicker, permissionOptions } from './lib/permission-picker'
export { PREVIEW_MODELS, type PreviewModel } from './lib/models'
export { ModelLogo } from './lib/model-logo'
export { MODEL_LOGOS } from './lib/model-logos'
export * from './lib/plugins'
export { TAMIZHI_PROFILES } from './generated/profiles'
export { getTamizhiProfiles, getTamizhiProfile } from './lib/profiles'
export type {
  TamizhiProfile,
  TamizhiProfileOptions,
  TamizhiAppearance
} from '@vezham/tamizhi-contracts'
