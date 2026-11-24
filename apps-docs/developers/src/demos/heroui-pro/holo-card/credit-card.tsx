// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { CSSProperties, SVGProps } from 'react'

import { HoloCard } from '@vezham/react-pro-v3'

/** Payment-card proportions (ISO/IEC 7810 ID-1, 85.6 × 54mm), in landscape. */
const PAYMENT_CARD = {
  '--holo-card-bleed': '28px',
  '--holo-card-height': '240px',
  '--holo-card-radius': '16px',
  '--holo-card-width': '380px'
} as CSSProperties

const CARD = {
  expiry: '08/29',
  holder: 'Marcus Wong',
  issuer: 'HeroUI',
  last4: '4242',
  tier: 'Platinum'
}

/** The EMV contactless mark, as four concentric arcs. */
function ContactlessMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      {...props}>
      <path d="M5.18 8.82a4.5 4.5 0 0 1 0 6.36" />
      <path d="M7.66 6.34a8 8 0 0 1 0 11.32" />
      <path d="M10.13 3.87a11.5 11.5 0 0 1 0 16.26" />
      <path d="M12.61 1.39a15 15 0 0 1 0 21.22" />
    </svg>
  )
}

/** The chip, drawn in CSS so the demo needs no image assets. */
function Chip() {
  return (
    <div
      aria-hidden="true"
      className="relative h-7 w-9 overflow-clip rounded-[5px] bg-gradient-to-br from-amber-100/80 via-yellow-600/70 to-amber-200/70">
      <div className="absolute inset-x-0 top-1/3 h-px bg-black/20" />
      <div className="absolute inset-x-0 top-2/3 h-px bg-black/20" />
      <div className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-black/20" />
    </div>
  )
}

export function CreditCard() {
  return (
    <HoloCard
      gradient="linear-gradient(135deg, rgb(48, 50, 60) 0%, rgb(34, 36, 46) 45%, rgb(21, 22, 31) 100%)"
      style={PAYMENT_CARD}>
      <HoloCard.Rotator>
        <HoloCard.Frame>
          <HoloCard.Surface>
            <HoloCard.Inset />
            <HoloCard.Pattern />

            <HoloCard.Content className="flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-wide text-white/80">
                    {CARD.issuer}
                  </span>
                  <span className="text-[10px] font-medium tracking-widest text-white/35">
                    {CARD.tier}
                  </span>
                </div>
                <ContactlessMark className="size-5 text-white/35" />
              </div>

              <div className="flex flex-col gap-3.5">
                <Chip />
                <span className="font-mono text-lg tracking-[0.18em] text-white/85">
                  <span aria-hidden="true">•••• •••• •••• </span>
                  <span className="sr-only">Card number ending in </span>
                  {CARD.last4}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-white/30">
                    Card holder
                  </span>
                  <span className="text-sm font-semibold text-white/70">
                    {CARD.holder}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-medium text-white/30">
                    Expires
                  </span>
                  <span className="text-sm font-semibold text-white/70 tabular-nums">
                    {CARD.expiry}
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
