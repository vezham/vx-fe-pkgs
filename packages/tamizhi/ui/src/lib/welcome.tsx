import { useId } from 'react'
import type { Ref } from 'react'

import type { TamizhiProfile } from '@vezham/tamizhi-contracts'

import { BotPicker } from './bot-picker'
import { TamizhiPluginSlot } from './plugins'

interface Props {
  avatarSlotRef: Ref<HTMLDivElement>
  profile: TamizhiProfile
  profiles: readonly TamizhiProfile[]
  onSelect: (id: string) => void
}

export const Welcome = ({
  avatarSlotRef,
  profile,
  profiles,
  onSelect
}: Props) => {
  const headingId = useId()
  return (
    <section className="tamizhi-welcome" aria-labelledby={headingId}>
      <div className="tamizhi-welcome__stage" ref={avatarSlotRef} />
      <BotPicker
        headingId={headingId}
        profile={profile}
        profiles={profiles}
        onSelect={onSelect}
      />
      <TamizhiPluginSlot name="welcome" />
    </section>
  )
}
