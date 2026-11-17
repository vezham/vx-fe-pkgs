import { Button, ScrollShadow } from '@vezham/react-v3'

import type { useIllustrationPalette } from '@src/lib/icon-library/use-illustration-palette'

import { AssetColorPicker } from './color-picker'
import { ResourceStatus } from './controls'

type Props = { palette: ReturnType<typeof useIllustrationPalette> }

export const IllustrationPalette = ({ palette }: Props) => (
  <section aria-label="Illustration colors" className="space-y-3">
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-sm font-medium">Colors</h2>
      <Button
        size="sm"
        variant="tertiary"
        isDisabled={!palette.customized}
        onPress={palette.reset}>
        Reset colors
      </Button>
    </div>
    <ResourceStatus
      loading={palette.loading}
      error={palette.error}
      retry={palette.retry}>
      {palette.palette.length ? (
        <ScrollShadow className="max-h-72 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {palette.palette.map((original, index) => (
              <AssetColorPicker
                key={original}
                label={`Color ${index + 1}`}
                value={palette.colors[original] ?? original}
                onChange={color => palette.change(original, color)}
              />
            ))}
          </div>
        </ScrollShadow>
      ) : (
        <p className="text-muted text-sm">
          This illustration has no editable solid colors.
        </p>
      )}
    </ResourceStatus>
  </section>
)
