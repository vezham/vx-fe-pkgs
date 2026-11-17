import type { Asset, AssetKind, IconWeight } from './catalog'
import { iconCdnUrl } from './runtime'

const scriptString = (value: string) =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')

type Options = {
  kind: AssetKind
  asset: Asset
  weight: IconWeight
  size: number
  color: string
  secondaryColor: string
  source: string
}
type Snippet = {
  id: string
  title: string
  language: string
  code: string
  logo?: string
  guide: string
}

export const getAssetSnippets = ({
  kind,
  asset,
  weight,
  size,
  color,
  secondaryColor,
  source
}: Options): Snippet[] => {
  if (kind !== 'icons') {
    const className = kind === 'logos' ? 'vx-logo' : 'vx-illustration'
    return [
      {
        id: 'html',
        guide: 'svg',
        title: 'HTML',
        language: 'html',
        logo: 'html5',
        code: `<img src="${source}" alt="${asset.title}" width="${size}" height="${size}" />`
      },
      {
        id: 'css',
        guide: 'svg',
        title: 'CSS',
        language: 'css',
        logo: 'css3',
        code: `/* Use: class="${className} ${className}--${asset.slug}" */\n.${className} {\n  width: ${size}px;\n  height: ${size}px;\n  background: center / contain no-repeat;\n}\n\n.${className}--${asset.slug} {\n  background-image: url("${source}");\n}`
      },
      {
        id: 'react',
        guide: 'svg',
        title: 'React',
        language: 'tsx',
        logo: 'react',
        code: `export const ${kind === 'logos' ? 'BrandLogo' : 'Illustration'} = () => (\n  <img src={${scriptString(source)}} alt={${scriptString(asset.title)}} width={${size}} height={${size}} />\n);`
      },
      {
        id: 'vue',
        guide: 'svg',
        title: 'Vue',
        language: 'vue',
        logo: 'vue',
        code: `<script setup>\nconst src = ${scriptString(source)};\nconst alt = ${scriptString(asset.title)};\n</script>\n\n<template>\n  <img :src="src" :alt="alt" :width="${size}" :height="${size}" />\n</template>`
      }
    ]
  }
  const secondary = weight.startsWith('duotone')
  const jsxColor = `color="${color}"${secondary ? ` secondaryColor="${secondaryColor}"` : ''}`
  const jsColor = `color: '${color}'${secondary ? `, secondaryColor: '${secondaryColor}'` : ''}`
  const htmlColor = `color="${color}"${secondary ? ` secondary-color="${secondaryColor}"` : ''}`
  const filename = `${asset.slug}${weight === 'outline' ? '' : '-' + weight}.svg`
  const svgUrl = new URL(`icons/${filename}`, iconCdnUrl).href
  const flutterName = asset.slug.replace(/-([a-z0-9])/g, (_, char: string) =>
    char.toUpperCase()
  )
  const flutterWeight = weight.replace(/-([a-z])/g, (_, char: string) =>
    char.toUpperCase()
  )
  return [
    {
      id: 'vanilla',
      guide: 'vanilla',
      title: 'JS',
      language: 'javascript',
      logo: 'javascript',
      code: `import { ${asset.title} } from '@vezham/icons';\n\nconst icon = ${asset.title}({ size: ${size}, weight: '${weight}', ${jsColor} });\ndocument.body.appendChild(icon);`
    },
    {
      id: 'cdn',
      guide: 'vanilla',
      title: 'CDN',
      language: 'html',
      logo: 'javascript',
      code: `<script defer src="${iconCdnUrl}"></script>\n\n<vx-icon icon="${asset.slug}" weight="${weight}" size="${size}" ${htmlColor}></vx-icon>`
    },
    {
      id: 'svg-url',
      guide: 'svg',
      title: 'HTML',
      language: 'html',
      logo: 'html5',
      code: `<img src="${svgUrl}" width="${size}" height="${size}" alt="${asset.slug} icon" />`
    },
    {
      id: 'react',
      guide: 'react',
      title: 'React',
      language: 'tsx',
      logo: 'react',
      code: `import { ${asset.title} } from '@vezham/icons-react';\n\n<${asset.title} size={${size}} weight="${weight}" ${jsxColor} />`
    },
    {
      id: 'direct',
      guide: 'react',
      title: 'Direct',
      language: 'tsx',
      logo: 'react',
      code: `import ${asset.title} from '@vezham/icons-react/icons/${asset.title}';\n\n<${asset.title} size={${size}} weight="${weight}" ${jsxColor} />`
    },
    {
      id: 'react-native',
      guide: 'react-native',
      title: 'React Native',
      language: 'tsx',
      logo: 'react',
      code: `import { ${asset.title} } from '@vezham/icons-react-native';\n\n<${asset.title} size={${size}} weight="${weight}" ${jsxColor} />`
    },
    {
      id: 'vue',
      guide: 'vue',
      title: 'Vue',
      language: 'vue',
      logo: 'vue',
      code: `<script setup>\nimport { ${asset.title} } from '@vezham/icons-vue';\n</script>\n\n<template>\n  <${asset.title} :size="${size}" weight="${weight}" ${jsxColor} />\n</template>`
    },
    {
      id: 'svelte',
      guide: 'svelte',
      title: 'Svelte',
      language: 'svelte',
      logo: 'svelte',
      code: `<script>\nimport { ${asset.title} } from '@vezham/icons-svelte';\n</script>\n\n<${asset.title} size={${size}} weight="${weight}" ${jsxColor} />`
    },
    {
      id: 'flutter',
      guide: 'flutter',
      title: 'Flutter',
      language: 'dart',
      logo: 'flutter',
      code: `import 'package:flutter_svg/flutter_svg.dart';\nimport 'package:vezham_icons/icons.dart';\n\nSvgPicture.string(\n  vezhamIconSvg(Vezham.${flutterWeight}.${flutterName}),\n  width: ${size},\n  height: ${size},\n)`
    }
  ]
}
