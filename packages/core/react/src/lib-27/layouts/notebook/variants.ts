import { tv } from '@vezham/react-v3'

export const notebookSectionTabVariants = tv({
  base: 'inline-flex h-full items-center border-b-2 text-sm font-medium transition-colors',
  variants: {
    selected: {
      true: 'border-primary text-primary',
      false: 'text-muted hover:text-foreground border-transparent'
    }
  },
  defaultVariants: { selected: false }
})
