// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Gem } from '@gravity-ui/icons'

import { HoloCard } from '@vezham/react-pro-v3'

const MEMBER = {
  joinedAt: Date.parse('2026-03-12'),
  memberNumber: 999,
  name: 'Marcus Wong',
  plan: 'Lifetime'
}

function formatJoinedDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function MembershipCard() {
  return (
    <HoloCard gradient="linear-gradient(140deg, rgb(58, 55, 48) 0%, rgb(40, 40, 41) 38%, rgb(26, 27, 34) 78%, rgb(18, 19, 28) 100%)">
      <HoloCard.Rotator>
        <HoloCard.Frame>
          <HoloCard.Surface>
            <HoloCard.Inset />
            <HoloCard.Pattern />

            <HoloCard.Content className="justify-center pt-12">
              <Gem className="size-6 text-white/40 mix-blend-soft-light" />
            </HoloCard.Content>

            <HoloCard.Content className="flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {MEMBER.name}
              </span>
              <span className="text-[10px] font-medium text-white/40">
                {MEMBER.plan} member since{' '}
                {new Date(MEMBER.joinedAt).getFullYear()}
              </span>
            </HoloCard.Content>

            <HoloCard.Content className="items-end justify-center pb-10">
              <div className="flex w-[220px] justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-white/30">
                    Joined
                  </span>
                  <span className="text-sm font-semibold text-white/40">
                    {formatJoinedDate(MEMBER.joinedAt)}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-medium text-white/30">
                    Member
                  </span>
                  <span className="text-sm font-semibold text-white/40">
                    #{String(MEMBER.memberNumber).padStart(4, '0')}
                  </span>
                </div>
              </div>
            </HoloCard.Content>

            <HoloCard.Shine />
          </HoloCard.Surface>
        </HoloCard.Frame>
      </HoloCard.Rotator>
    </HoloCard>
  )
}
