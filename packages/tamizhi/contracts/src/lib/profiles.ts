import type { Outfit, Persona } from './chat'

export interface TamizhiAppearance {
  persona: Persona
  outfit: Outfit
}

export interface TamizhiProfile extends TamizhiAppearance {
  id: string
  name: string
  activities?: Readonly<Record<string, Partial<TamizhiAppearance>>>
}

export interface TamizhiProfileOptions {
  appId?: string
  profiles?: readonly TamizhiProfile[]
}
