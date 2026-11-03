import type { RefObject } from 'react'

import type { Outfit, Persona } from '@vezham/tamizhi-contracts'

import { outfitForPersona } from './avatar-data'
import type { Expression } from './avatar-data'
import { useCompanionRenderer } from './use-companion-renderer'

interface Props {
  persona?: Persona
  outfit?: Outfit
  expression?: Expression
  palette?: string
  isListening?: boolean
  isThinking?: boolean
  isAnimated?: boolean
  isOffline?: boolean
  focusTargetRef?: RefObject<HTMLElement | null> | null
  size?: 'small' | 'large'
  previewSize?: 28 | 44 | 72
  asImage?: boolean
}

export const Companion = ({
  persona = 'helper',
  outfit = outfitForPersona(persona),
  expression = 'neutral',
  palette,
  isListening = false,
  isThinking = false,
  isAnimated = true,
  isOffline = false,
  focusTargetRef = null,
  size = 'large',
  previewSize,
  asImage = false
}: Props) => {
  const renderSize = asImage ? 'small' : size
  const { host, connectionReaction, status, image } = useCompanionRenderer({
    outfit,
    expression,
    palette,
    isListening,
    isThinking,
    isAnimated,
    isOffline,
    focusTargetRef,
    size: renderSize,
    previewSize,
    asImage
  })

  return (
    <div
      ref={host}
      className={`tamizhi-companion tamizhi-companion--${renderSize}`}
      data-connection-reaction={connectionReaction?.phase}
      style={
        previewSize
          ? {
              width: `${previewSize / 16}rem`,
              height: `${previewSize / 16}rem`
            }
          : undefined
      }
      data-outfit={outfit}
      data-expression={expression}
      data-animated={isAnimated}
      data-status={status}
      aria-label={status === 'error' ? 'Avatar unavailable' : undefined}>
      {asImage && image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          width={previewSize ?? 36}
          height={previewSize ?? 36}
          className="h-full w-full object-contain"
        />
      )}
      {status === 'error' && (
        <span className="tamizhi-companion__error">Avatar unavailable</span>
      )}
    </div>
  )
}
