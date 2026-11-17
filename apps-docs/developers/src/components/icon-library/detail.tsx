import type { SearchSchemaInput } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Breadcrumbs, Button, Chip, Link } from '@vezham/react-v3'

import { i18n } from '@app/docs'
import type { Locale } from '@generated/vx'
import {
  type Asset,
  type AssetKind,
  type IconWeight,
  assetUrl,
  catalogRoutes,
  formatLabel,
  getAssetVariant,
  kindLabels
} from '@src/lib/icon-library/catalog'
import { getIconSvg } from '@src/lib/icon-library/runtime'
import { getAssetSnippets } from '@src/lib/icon-library/snippets'
import { fetchAssetSvg } from '@src/lib/icon-library/svg'
import { useAssetExports } from '@src/lib/icon-library/use-asset-exports'
import { useCatalog } from '@src/lib/icon-library/use-catalog'
import { useIllustrationPalette } from '@src/lib/icon-library/use-illustration-palette'
import { pageTitle } from '@src/lib/page-head'

import { AssetSelect, ResourceStatus } from './controls'
import { AssetDetailPreview } from './detail-preview'
import { AssetDetailSnippets } from './detail-snippets'
import { AssetPropsReference } from './props-reference'
import { RelatedAssets } from './related-assets'
import { AssetShell } from './shell'

export const parseDetailSearch = (
  input: Record<string, unknown> & SearchSchemaInput
) => ({
  weight: typeof input.weight === 'string' ? input.weight : 'outline'
})

type Props = {
  kind: AssetKind
  name: string
  locale: Locale
  initialWeight?: string
}
export const AssetDetail = ({
  kind,
  name,
  locale,
  initialWeight = 'outline'
}: Props) => {
  const resource = useCatalog(kind)
  const asset = resource.data?.find(
    item =>
      item.slug === name || item.title.toLowerCase() === name.toLowerCase()
  )
  useEffect(() => {
    if (!asset) return
    const title = pageTitle(
      kind === 'icons' ? formatLabel(asset.slug) : asset.title,
      kindLabels[kind]
    )
    document.title = title
    for (const element of document.querySelectorAll<HTMLMetaElement>(
      'meta[property="og:title"], meta[name="twitter:title"]'
    ))
      element.content = title
  }, [asset, kind])
  const lang = locale === i18n.defaultLanguage ? undefined : locale

  return (
    <AssetShell active={kind} locale={locale}>
      <Breadcrumbs>
        <Breadcrumbs.Item
          href={`${lang ? '/' + lang : ''}${catalogRoutes[kind]}`}>
          {kindLabels[kind]}
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>{asset?.title ?? formatLabel(name)}</Breadcrumbs.Item>
      </Breadcrumbs>
      <ResourceStatus
        loading={resource.loading}
        error={resource.error}
        retry={resource.retry}>
        {!asset ? (
          <div className="py-20 text-center">
            <h1 className="text-3xl font-semibold">Asset not found</h1>
            <p className="text-muted mt-3">
              This asset is not in the current collection.
            </p>
            <Link
              href={`${lang ? '/' + lang : ''}${catalogRoutes[kind]}`}
              className="mt-6">
              Browse {kindLabels[kind].toLowerCase()}
            </Link>
          </div>
        ) : (
          <AssetDetailContent
            asset={asset}
            assets={resource.data ?? []}
            kind={kind}
            locale={locale}
            initialWeight={initialWeight}
          />
        )}
      </ResourceStatus>
    </AssetShell>
  )
}

type DetailContentProps = {
  asset: Asset
  assets: Asset[]
  kind: AssetKind
  locale: Locale
  initialWeight: string
}

const AssetDetailContent = ({
  asset,
  assets,
  kind,
  locale,
  initialWeight
}: DetailContentProps) => {
  const [weight, setWeight] = useState(initialWeight)
  const [size, setSize] = useState(128)
  const [exportSize, setExportSize] = useState('128')
  const [color, setColor] = useState('#0485f7')
  const [secondaryColor, setSecondaryColor] = useState('#9ecfff')
  const [variant, setVariant] = useState('original')
  const [showGrid, setShowGrid] = useState(true)
  const [selectedSnippet, setSelectedSnippet] = useState('svg')
  const activeWeight = asset.weights.includes(weight as IconWeight)
    ? (weight as IconWeight)
    : (asset.weights[0] ?? 'outline')
  const activeVariant = getAssetVariant(asset, variant)
  const source = kind !== 'icons' ? assetUrl(kind, asset, activeVariant) : ''
  const illustration = useIllustrationPalette(
    kind === 'illustrations' ? source : ''
  )
  const lang = locale === i18n.defaultLanguage ? undefined : locale
  const loadSvg = () =>
    kind === 'icons'
      ? getIconSvg(
          asset.slug,
          activeWeight,
          Number(exportSize),
          color,
          secondaryColor
        )
      : kind === 'illustrations' && illustration.svg
        ? Promise.resolve(illustration.svg)
        : fetchAssetSvg(source)
  const { busy, message, copySvg, exportFile, clearMessage } = useAssetExports({
    loadSvg,
    exportSize,
    getFilename: format => {
      if (kind === 'icons') return `${asset.slug}-${activeWeight}-${exportSize}`
      const variantSuffix = kind === 'logos' ? '-' + activeVariant : ''
      const sizeSuffix = format === 'svg' ? '' : '-' + exportSize
      return `${asset.slug}${variantSuffix}${sizeSuffix}`
    }
  })
  const reset = () => {
    setWeight('outline')
    setSize(128)
    setExportSize('128')
    setColor('#0485f7')
    setSecondaryColor('#9ecfff')
    setVariant('original')
    clearMessage()
    setShowGrid(true)
    illustration.reset()
  }
  const snippets = getAssetSnippets({
    kind,
    asset,
    weight: activeWeight,
    size,
    color,
    secondaryColor,
    source: illustration.customized ? `./${asset.slug}.svg` : source
  })
  const related = assets
    .filter(
      item => item.category === asset.category && item.slug !== asset.slug
    )
    .slice(0, 8)
  const activeSnippet = snippets.find(snippet => snippet.id === selectedSnippet)

  return (
    <>
      <AssetHeading asset={asset} kind={kind} />
      <div className="grid min-w-0 gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
        <AssetDetailPreview
          asset={asset}
          kind={kind}
          activeVariant={activeVariant}
          source={source}
          illustration={illustration}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          size={size}
          setSize={setSize}
          activeWeight={activeWeight}
          setWeight={setWeight}
          color={color}
          setColor={setColor}
          secondaryColor={secondaryColor}
          setSecondaryColor={setSecondaryColor}
          setVariant={setVariant}
          reset={reset}
        />
        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-end gap-3">
            <AssetSelect
              label="Export size"
              value={exportSize}
              options={[16, 24, 32, 48, 64, 128, 256, 512, 1024].map(n => ({
                id: String(n),
                title: `${n}px`
              }))}
              onChange={setExportSize}
            />
            <Button isDisabled={busy} onPress={() => void copySvg()}>
              Copy SVG
            </Button>
            <Button
              variant="secondary"
              isDisabled={busy}
              onPress={() => void exportFile('svg')}>
              Download SVG
            </Button>
            <Button
              variant="secondary"
              isDisabled={busy}
              onPress={() => void exportFile('png')}>
              PNG
            </Button>
            <Button
              variant="secondary"
              isDisabled={busy}
              onPress={() => void exportFile('webp')}>
              WebP
            </Button>
            {kind !== 'icons' && (
              <Link href={source} target="_blank" rel="noopener noreferrer">
                Open SVG
                <Link.Icon />
              </Link>
            )}
          </div>
          <p
            role="status"
            aria-live="polite"
            className="text-muted min-h-5 text-sm">
            {busy
              ? 'Preparing your SVG…'
              : message ||
                'Copy the SVG, export an image, or use an embed snippet below.'}
          </p>
          <AssetDetailSnippets
            kind={kind}
            name={asset.slug}
            source={source}
            weight={activeWeight}
            size={Number(exportSize)}
            color={color}
            secondaryColor={secondaryColor}
            illustrationSvg={illustration.svg}
            snippets={snippets}
            selectedSnippet={activeSnippet?.id ?? 'svg'}
            onSelectionChange={setSelectedSnippet}
          />
          {illustration.customized && (
            <p className="text-muted text-sm">
              Download the customized SVG as {asset.slug}.svg to use these embed
              examples. Open SVG shows the original artwork.
            </p>
          )}
          <AssetPropsReference icons={kind === 'icons'} />
          <Link
            href={`${lang ? '/' + lang : ''}/docs/assets/guides/${activeSnippet?.guide ?? 'svg'}`}>
            Read the integration guide
          </Link>
        </div>
      </div>
      <RelatedAssets
        items={related}
        kind={kind}
        category={asset.category}
        lang={lang}
      />
    </>
  )
}

const AssetHeading = ({ asset, kind }: { asset: Asset; kind: AssetKind }) => (
  <header className="space-y-3">
    <h1 className="text-3xl font-semibold tracking-tight">
      {kind === 'icons' ? formatLabel(asset.slug) : asset.title}
    </h1>
    <div className="flex flex-wrap gap-2">
      <Chip variant="soft">
        <Chip.Label>{formatLabel(asset.category)}</Chip.Label>
      </Chip>
      {asset.subcategory && (
        <Chip variant="soft">
          <Chip.Label>{formatLabel(asset.subcategory)}</Chip.Label>
        </Chip>
      )}
      <span className="text-muted text-sm">{asset.slug}</span>
    </div>
  </header>
)
