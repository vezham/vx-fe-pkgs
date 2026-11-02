import type {
  TamizhiAppearance,
  TamizhiProfile,
  ToolActivity
} from '@vezham/tamizhi-contracts'

export const TAMIZHI_PROFILES: readonly TamizhiProfile[] = [
  { id: 'vezham-tamizhi', name: 'Tamizhi', persona: 'helper', outfit: 'rest' },
  {
    id: 'vezham-crm',
    name: 'CRM',
    persona: 'planner',
    outfit: 'planner',
    activities: {
      mcp_crm_revenue_report: { persona: 'planner', outfit: 'money' },
      'skill.sales-coaching': { persona: 'helper', outfit: 'coach' }
    }
  },
  {
    id: 'vezham-school-os',
    name: 'School OS',
    persona: 'tutor',
    outfit: 'tutor'
  }
]

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
