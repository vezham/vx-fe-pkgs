import { useId } from 'react'
import type { Ref } from 'react'

import type { TamizhiProfile } from '@vezham/tamizhi-contracts'

import { TamizhiPluginSlot } from './plugins'

interface Props {
  avatarSlotRef: Ref<HTMLDivElement>
  profile: TamizhiProfile
}

export const EmbedWelcome = ({ avatarSlotRef, profile }: Props) => {
  const headingId = useId()
  return (
    <section className="tamizhi-welcome" aria-labelledby={headingId}>
      <div className="tamizhi-welcome__stage" ref={avatarSlotRef} />
      <h1 id={headingId} className="tamizhi-welcome__question">
        {profile.id === 'vezham-tamizhi'
          ? 'How can I help?'
          : `How can I help with ${profile.name}?`}
      </h1>
      <TamizhiPluginSlot name="welcome" />
    </section>
  )
}
