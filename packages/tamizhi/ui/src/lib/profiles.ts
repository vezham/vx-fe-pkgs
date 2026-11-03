import type {
  TamizhiAppearance,
  TamizhiProfile,
  ToolActivity
} from '@vezham/tamizhi-contracts'

import { TAMIZHI_PROFILES } from '../generated/profiles'

export const getTamizhiProfiles = (
  profiles: readonly TamizhiProfile[] = []
) => {
  const merged = new Map(TAMIZHI_PROFILES.map(profile => [profile.id, profile]))
  for (const profile of profiles) merged.set(profile.id, profile)
  return [...merged.values()]
}

export const getTamizhiProfile = (
  id: string | undefined,
  profiles: readonly TamizhiProfile[]
): TamizhiProfile =>
  profiles.find(profile => profile.id === id) ??
  profiles.find(profile => profile.id === 'vezham-tamizhi') ??
  TAMIZHI_PROFILES[0]

export const getActivityAppearance = (
  profile: TamizhiProfile,
  activities: readonly ToolActivity[]
): Partial<TamizhiAppearance> | undefined => {
  const pending = new Map<string, ToolActivity>()
  for (const event of activities) {
    const key = `${event.runId}:${event.callId}`
    if (event.type === 'tool-result') pending.delete(key)
    else pending.set(key, event)
  }
  const activity = [...pending.values()]
    .reverse()
    .find(event => profile.activities?.[event.name])
  return activity ? profile.activities?.[activity.name] : undefined
}
