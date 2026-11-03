import { expect, it } from 'vitest'

import { tamizhiProfilesSchema } from './profiles'

const defaultProfile = {
  id: 'vezham-tamizhi',
  name: 'Tamizhi',
  persona: 'helper',
  outfit: 'rest'
}

it('validates app profiles and partial activity overrides', () => {
  const profiles = [
    defaultProfile,
    {
      id: 'vezham-crm',
      name: 'CRM',
      persona: 'planner',
      outfit: 'planner',
      activities: {
        mcp_crm_revenue_report: { outfit: 'money' },
        'skill.sales-coaching': { persona: 'helper', outfit: 'coach' }
      }
    }
  ]
  expect(tamizhiProfilesSchema.parse(profiles)).toEqual(profiles)
})

it.each([
  { persona: 'unknown' },
  { outfit: 'unknown' },
  { name: ' ' },
  { activities: { tool: { outfit: 'unknown' } } },
  { activities: { tool: { persona: 'unknown' } } },
  { activities: { tool: { oufit: 'money' } } },
  { outift: 'money' }
])('rejects invalid profile configuration: %j', invalid => {
  expect(
    tamizhiProfilesSchema.safeParse([{ ...defaultProfile, ...invalid }]).success
  ).toBe(false)
})

it('requires a default profile and unique profile IDs', () => {
  expect(tamizhiProfilesSchema.safeParse([]).success).toBe(false)
  expect(() =>
    tamizhiProfilesSchema.parse([{ ...defaultProfile, id: 'vezham-crm' }])
  ).toThrow('The default vezham-tamizhi profile is required')
  expect(() =>
    tamizhiProfilesSchema.parse([defaultProfile, defaultProfile])
  ).toThrow('Profile IDs must be unique')
})

it('validates the profiles section and rejects unknown configuration sections', async () => {
  const { tamizhiConfigSchema } = await import('./profiles')
  expect(tamizhiConfigSchema.parse({ profiles: [defaultProfile] })).toEqual({
    profiles: [defaultProfile]
  })
  expect(tamizhiConfigSchema.safeParse([defaultProfile]).success).toBe(false)
  expect(
    tamizhiConfigSchema.safeParse({ profiles: [defaultProfile], typo: [] })
      .success
  ).toBe(false)
})
