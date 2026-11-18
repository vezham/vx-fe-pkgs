import { InstallTabs } from '@vezham/react/components/install-tabs'

export const Development = () => (
  <div className="w-full min-w-0">
    <InstallTabs
      packages={['typescript', 'vitest']}
      dev
      defaultManager="pnpm"
      showIcons={false}
    />
  </div>
)
