import configPackage from '@vezham/config/package.json'
import devtoolsPackage from '@vezham/devtools/package.json'
import envPackage from '@vezham/env/package.json'
import hooksPackage from '@vezham/hooks/package.json'
import startPackage from '@vezham/start/package.json'
import templatePackage from '@vezham/template/package.json'
import utilsPackage from '@vezham/utils/package.json'

export const docsPackages = {
  env: { name: envPackage.name, version: envPackage.version },
  start: { name: startPackage.name, version: startPackage.version },
  template: { name: templatePackage.name, version: templatePackage.version },
  utils: { name: utilsPackage.name, version: utilsPackage.version },
  devtools: { name: devtoolsPackage.name, version: devtoolsPackage.version },
  config: { name: configPackage.name, version: configPackage.version },
  hooks: { name: hooksPackage.name, version: hooksPackage.version }
} as const

export type DocsPackage = keyof typeof docsPackages
export const docsPackageIds = Object.keys(docsPackages) as DocsPackage[]

export const getDocsPackage = (value?: string) =>
  docsPackageIds.find(id => id === value)

export const getPackageDocsPath = (packageId: DocsPackage, page: string) =>
  `/docs/packages/${packageId}/${page}`
