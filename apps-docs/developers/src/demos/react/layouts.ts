import type { ComponentType } from 'react'

export const layoutDemos: Record<
  string,
  { title: string; file: string; loader: () => Promise<ComponentType> }
> = {
  'react-notebook-default': {
    title: 'Basic notebook layout',
    file: 'notebook/default.tsx',
    loader: () => import('./notebook/default').then(module => module.Default)
  },
  'react-notebook-custom-controls': {
    title: 'Notebook with custom controls',
    file: 'notebook/custom-controls.tsx',
    loader: () =>
      import('./notebook/custom-controls').then(module => module.CustomControls)
  }
}
