import { tv } from '@vezham/react-v3'

export const createSectionLayoutVariant = (sidebarWidth: 'w-56' | 'w-64') =>
  tv({
    slots: {
      base: 'bg-background flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden',
      header:
        'border-default-200 bg-background sticky top-0 z-30 hidden px-3 py-2 md:block md:px-4',
      header_inner: 'flex min-h-12 items-center justify-between gap-3',
      header_left: 'flex min-w-0 flex-1 items-center gap-1',
      header_tabs_desktop: 'hidden min-w-0 flex-1 md:block',
      header_right: 'flex shrink-0 items-center gap-1 md:gap-2',
      header_tabs_mobile:
        'border-default-200 bg-background/90 mb-3 flex w-fit max-w-[calc(100vw-2rem)] shrink-0 justify-center self-center rounded-full border px-1 py-1 shadow-[0_14px_28px_rgba(15,23,42,0.14)] backdrop-blur-xl md:hidden',
      shell: 'flex min-h-0 flex-1',
      separator: 'my-2',
      sidebar_rail:
        sidebarWidth === 'w-56'
          ? 'bg-background hidden w-56 shrink-0 overflow-hidden transition-all duration-300 md:block'
          : 'bg-background hidden w-64 shrink-0 overflow-hidden transition-all duration-300 md:block',
      sidebar_rail_closed: 'w-0 border-r-0',
      sidebar_rail_compact:
        'border-default-200/60 w-16 overflow-visible border-r',
      content: 'min-w-0 flex-1 overflow-auto p-4 md:p-4',
      content_surface: 'min-h-full rounded-lg p-4 sm:p-5',
      drawer_dialog: 'bg-background w-[min(20rem,calc(100vw-2rem))]',
      drawer_header: 'border-default-200 flex items-center justify-between',
      drawer_title: 'text-base font-semibold',
      drawer_body: '',
      icon_button: 'h-9 w-9 min-w-9 p-0',
      search_button: 'h-9 w-9 min-w-9 p-0 md:hidden',
      primary_button: 'h-9 min-w-9 px-0 md:px-3',
      inline_icon: 'shrink-0',
      search_field: 'hidden w-56 md:block',
      search_icon: 'text-muted-foreground h-4 w-4',
      primary_label: 'hidden !text-inherit md:inline',
      dropdown_label: 'flex items-center gap-2',
      sidebar: 'p-2',
      sidebar_collapsed: 'flex justify-center p-2',
      sidebar_toggle: 'mb-2 h-9 w-9 min-w-9 p-0',
      sidebar_list: 'space-y-1',
      sidebar_collapsed_list: 'flex flex-col items-center gap-1',
      sidebar_item_wrap: 'group relative',
      sidebar_item:
        'text-muted hover:bg-default-100 hover:text-foreground flex items-center gap-3 rounded-full px-3 py-2 text-sm font-normal transition-colors duration-200',
      sidebar_item_active:
        'bg-default-100 text-foreground hover:bg-default-100 hover:text-foreground flex items-center gap-3 rounded-full px-3 py-2 text-sm font-bold transition-colors duration-200',
      sidebar_child_group:
        'border-default-200 mt-1 ml-6 space-y-1 border-l pl-4',
      sidebar_child_item:
        'text-muted hover:bg-default-100 hover:text-foreground flex items-center gap-3 rounded-full px-3 py-2 text-sm font-normal transition-colors duration-200',
      sidebar_child_item_active:
        'bg-default-100 text-foreground hover:bg-default-100 hover:text-foreground flex items-center gap-3 rounded-full px-3 py-2 text-sm font-bold transition-colors duration-200',
      sidebar_collapsed_item:
        'text-muted hover:bg-primary/5 hover:text-primary flex h-10 w-10 items-center justify-center rounded-md transition-colors',
      sidebar_collapsed_item_active:
        'bg-primary/10 text-primary hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-md transition-colors',
      sidebar_flyout:
        'bg-background border-default-200 invisible absolute top-0 left-full z-50 ml-2 min-w-64 rounded-lg border p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100',
      sidebar_flyout_label:
        'text-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold',
      sidebar_flyout_list: 'mt-1 space-y-1',
      sidebar_flyout_item:
        'text-muted hover:bg-default-100 hover:text-foreground flex items-center gap-3 rounded-full px-3 py-2 text-sm font-normal transition-colors',
      sidebar_flyout_item_active:
        'bg-default-100 text-primary hover:bg-default-100 hover:text-primary flex items-center gap-3 rounded-full px-3 py-2 text-sm font-bold transition-colors',
      sidebar_disclosure_icon: 'text-muted ml-auto shrink-0',
      sidebar_icon: 'text-muted shrink-0',
      sidebar_icon_active: 'text-foreground shrink-0',
      sidebar_label: 'min-w-0 truncate',
      sidebar_label_active: 'text-foreground min-w-0 truncate font-bold',
      tabs_scroller:
        'scrollbar-hide w-full overflow-x-auto rounded-full sm:max-w-fit',
      tabs_list: 'flex min-w-max flex-nowrap *:whitespace-nowrap',
      tabs_tab: 'whitespace-nowrap'
    },
    variants: {
      variant: {
        default: {},
        compact: {
          content: 'p-3',
          content_surface: 'p-3'
        }
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  })
