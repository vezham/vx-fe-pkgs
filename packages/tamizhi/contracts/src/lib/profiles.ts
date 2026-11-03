import { z } from 'zod'

import type { Outfit, Persona } from './chat'
import { wireMessageSchema } from './protocol'

export interface TamizhiAppearance {
  persona: Persona
  outfit: Outfit
}

export interface TamizhiProfile extends TamizhiAppearance {
  id: string
  name: string
  category?: string
  activities?: Readonly<Record<string, Partial<TamizhiAppearance>>>
}

export interface TamizhiProfileOptions {
  appId?: string
  profiles?: readonly TamizhiProfile[]
}

const appearanceSchema = z.strictObject({
  persona: wireMessageSchema.shape.persona.unwrap(),
  outfit: wireMessageSchema.shape.outfit.unwrap()
})

export const tamizhiProfileSchema = appearanceSchema.extend({
  id: z.string().trim().min(1).max(128),
  name: z.string().trim().min(1).max(128),
  category: z.string().trim().min(1).max(64).optional(),
  activities: z
    .record(z.string().min(1).max(256), appearanceSchema.partial())
    .optional()
}) satisfies z.ZodType<TamizhiProfile>

export const tamizhiProfilesSchema = z
  .array(tamizhiProfileSchema)
  .min(1)
  .refine(
    profiles =>
      new Set(profiles.map(profile => profile.id)).size === profiles.length,
    {
      message: 'Profile IDs must be unique'
    }
  )
  .refine(
    profiles => profiles.some(profile => profile.id === 'vezham-tamizhi'),
    {
      message: 'The default vezham-tamizhi profile is required'
    }
  )

export const tamizhiConfigSchema = z.strictObject({
  profiles: tamizhiProfilesSchema
})
