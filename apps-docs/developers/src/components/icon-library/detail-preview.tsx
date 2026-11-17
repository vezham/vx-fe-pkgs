import { Button, Card, Label, Slider, Switch } from '@vezham/react-v3'

import type {
  Asset,
  AssetKind,
  IconWeight
} from '@src/lib/icon-library/catalog'
import { formatLabel } from '@src/lib/icon-library/catalog'
import type { useIllustrationPalette } from '@src/lib/icon-library/use-illustration-palette'

import { AssetColorPicker } from './color-picker'
import { AssetSelect, CdnIcon } from './controls'
import { IllustrationPalette } from './illustration-palette'

type Props = {
  asset: Asset
  kind: AssetKind
  activeVariant: string
  source: string
  illustration: ReturnType<typeof useIllustrationPalette>
  showGrid: boolean
  setShowGrid: (value: boolean) => void
  size: number
  setSize: (value: number) => void
  activeWeight: IconWeight
  setWeight: (value: string) => void
  color: string
  setColor: (value: string) => void
  secondaryColor: string
  setSecondaryColor: (value: string) => void
  setVariant: (value: string) => void
  reset: () => void
}

export const AssetDetailPreview = ({
  asset,
  kind,
  activeVariant,
  source,
  illustration,
  showGrid,
  setShowGrid,
  size,
  setSize,
  activeWeight,
  setWeight,
  color,
  setColor,
  secondaryColor,
  setSecondaryColor,
  setVariant,
  reset
}: Props) => (
  <div className="space-y-6">
    <Card>
      <Card.Content
        className={`flex min-h-80 items-center justify-center overflow-hidden ${showGrid ? 'asset-preview--grid' : ''} ${kind === 'logos' ? (activeVariant.includes('white') ? 'rounded-xl bg-black' : 'asset-preview--logo rounded-xl') : ''}`}>
        {kind === 'icons' ? (
          <CdnIcon
            name={asset.slug}
            weight={activeWeight}
            size={size}
            color={color}
            secondaryColor={secondaryColor}
          />
        ) : (
          <img
            src={kind === 'illustrations' ? illustration.preview : source}
            alt={asset.title}
            width={size}
            height={size}
            style={{ width: size, height: size }}
            className="max-w-full object-contain"
          />
        )}
      </Card.Content>
    </Card>
    <Switch
      aria-label="Preview grid"
      className="w-full"
      isSelected={showGrid}
      onChange={setShowGrid}>
      <Switch.Content className="w-full justify-between">
        Grid
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Content>
    </Switch>
    <Slider
      aria-label="Preview size"
      value={size}
      minValue={16}
      maxValue={256}
      step={8}
      onChange={value => setSize(Number(value))}>
      <Label>Preview size</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
    {kind === 'icons' && (
      <>
        <AssetSelect
          label="Weight"
          value={activeWeight}
          options={asset.weights.map(id => ({
            id,
            title: formatLabel(id)
          }))}
          onChange={setWeight}
        />
        <AssetColorPicker
          label="Primary color"
          value={color}
          onChange={setColor}
        />
        {activeWeight.startsWith('duotone') && (
          <AssetColorPicker
            label="Secondary color"
            value={secondaryColor}
            onChange={setSecondaryColor}
          />
        )}
      </>
    )}
    {kind === 'logos' && (
      <AssetSelect
        label="Logo variant"
        value={activeVariant}
        options={Object.keys(asset.variants).map(id => ({
          id,
          title: formatLabel(id)
        }))}
        onChange={setVariant}
      />
    )}
    {kind === 'illustrations' && <IllustrationPalette palette={illustration} />}
    <Button variant="tertiary" onPress={reset}>
      Reset preview
    </Button>
  </div>
)
