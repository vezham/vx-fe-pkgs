// Adapted documented HeroUI Pro example; see ../README.md.
import { createCookieStorage } from '@vezham/react-pro-v3'
import { Resizable } from '@vezham/react-pro-v3/resizable'

const storage = createCookieStorage()

export function ResizableLayout() {
  return (
    <Resizable autoSaveId="app:panels" storage={storage}>
      <Resizable.Panel defaultSize={30} minSize={20}>
        Sidebar
      </Resizable.Panel>
      <Resizable.Handle />
      <Resizable.Panel defaultSize={70}>Main</Resizable.Panel>
    </Resizable>
  )
}
