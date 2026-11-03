import type { CompanionOptions } from './companion-types'
import { useCompanionRenderer } from './use-companion-renderer'

export const Companion = (props: CompanionOptions) => {
  const { host, connectionReaction, status, image, appearance } =
    useCompanionRenderer(props)
  const { size, previewSize, outfit, expression, isAnimated, asImage } =
    appearance

  return (
    <div
      ref={host}
      className={`tamizhi-companion tamizhi-companion--${size}`}
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
