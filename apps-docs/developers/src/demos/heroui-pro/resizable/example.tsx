// Adapted documented HeroUI Pro example; see ../README.md.
import { Resizable } from '@vezham/react-pro-v3/resizable'

export function Example() {
  return (
    <Resizable orientation="horizontal" autoSaveId="app:shell">
      <Resizable.Panel defaultSize={30} minSize={15} maxSize={45}>
        Sidebar
      </Resizable.Panel>
      <Resizable.Handle variant="primary" type="line" withIndicator />
      <Resizable.Panel>Main content</Resizable.Panel>
    </Resizable>
  )
}
