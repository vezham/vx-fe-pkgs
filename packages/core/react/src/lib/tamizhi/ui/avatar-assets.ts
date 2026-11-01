const assets = import.meta.glob<string>('./vendor/momo/mesh/*', {
  eager: true,
  query: '?url&no-inline',
  import: 'default'
})

export const resolveAvatarAsset = (suffix: string) => {
  const url = assets[`./vendor/momo/mesh/momo${suffix}`]
  if (!url) throw new Error(`Missing Tamizhi avatar asset: ${suffix}`)
  return url
}
