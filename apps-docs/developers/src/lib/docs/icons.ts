import { type ReactNode, createElement, isValidElement } from 'react'

import {
  Book,
  Book2,
  ChatSquareCode,
  Checklist,
  CodeFile,
  CodeSquare,
  Copy,
  DocumentText,
  Figma,
  Layers,
  MinimalisticMagnifier,
  Moon,
  NotebookBookmark,
  PaintBrush,
  Palette,
  Rocket,
  Route,
  Settings,
  Star,
  TextFormat,
  TextSquare,
  VezhamLogo,
  Widget
} from '@vezham/icons-react'

const icons: Record<string, typeof Book> = {
  'circles-4-diamond': Widget,
  'book-open': Book2,
  route: Route,
  rocket: Rocket,
  sparkles: Star,
  figma: Figma,
  'code-pull-request-arrow-right': CodeFile,
  'copy-transparent': Copy,
  'bucket-paint': Palette,
  layers: Layers,
  windows: Widget,
  'chevrons-expand-horizontal': CodeSquare,
  brush: PaintBrush,
  palette: Palette,
  book: Book,
  moon: Moon,
  terminal: CodeSquare,
  'text-format': TextFormat,
  'document-text': DocumentText,
  'text-square': TextSquare,
  'code-square': CodeSquare,
  'code-file': CodeFile,
  checklist: Checklist,
  'vezham-logo': VezhamLogo,
  'notebook-bookmark': NotebookBookmark,
  'chat-square-code': ChatSquareCode,
  'minimalistic-magnifier': MinimalisticMagnifier,
  settings: Settings
}

export const resolveDocsIcon = (icon: ReactNode): ReactNode => {
  if (!isValidElement<{ 'data-vx-icon'?: string }>(icon)) return icon
  const name = icon.props['data-vx-icon']
  if (!name) return icon
  // vx-bot/NOTE: Upstream icon names do not all exist in the generic docs icon CDN.
  return createElement(icons[name] ?? CodeFile, {
    size: 16,
    'aria-hidden': true
  })
}
