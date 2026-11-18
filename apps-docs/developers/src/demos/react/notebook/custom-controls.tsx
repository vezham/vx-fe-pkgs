import { Button, Popover } from '@vezham/react-v3'
import { Brand } from '@vezham/react/components/brand'
import { Notebook } from '@vezham/react/layouts/notebook'

import { NotebookExamplePage, useNotebookExample } from './shared'

const basePath = '/examples/react-notebook-custom-controls'

const ReleaseNotes = () => (
  <Popover>
    <Button size="sm" variant="secondary">
      Release notes
    </Button>
    <Popover.Content className="max-w-64">
      <Popover.Dialog>
        <Popover.Heading>Version 2.0</Popover.Heading>
        <p className="text-muted mt-2 text-sm">
          Section tabs and responsive drawers are now available.
        </p>
      </Popover.Dialog>
    </Popover.Content>
  </Popover>
)

export const CustomControls = () => {
  const { path, page, tree, sections } = useNotebookExample(basePath)
  const brand = <Brand.Link to={basePath} name="Acme" channel="API" />
  const controls = <ReleaseNotes />

  return (
    <Notebook
      tree={tree}
      {...Notebook.getLayoutOptions({
        path,
        title: 'Acme API',
        sections,
        sectionLabel: 'API documentation sections',
        baseOptions: { slots: { searchTrigger: false } },
        leading: <span className="text-muted text-xs">v2.0</span>,
        secondary: <span className="text-muted text-sm">Public API</span>,
        headerProps: { brand, controls },
        drawerHeaderProps: { brand },
        drawerFooterProps: { controls }
      })}>
      <NotebookExamplePage page={page} />
    </Notebook>
  )
}
