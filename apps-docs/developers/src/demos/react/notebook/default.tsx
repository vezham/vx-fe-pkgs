import { Brand } from '@vezham/react/components/brand'
import { Notebook } from '@vezham/react/layouts/notebook'

import { NotebookExamplePage, useNotebookExample } from './shared'

const basePath = '/examples/react-notebook-default'

export const Default = () => {
  const { path, page, tree, sections } = useNotebookExample(basePath)
  const brand = <Brand.Link to={basePath} name="Acme" channel="Docs" />

  return (
    <Notebook
      tree={tree}
      {...Notebook.getLayoutOptions({
        path,
        title: 'Acme Docs',
        sections,
        baseOptions: { slots: { searchTrigger: false } },
        headerProps: { brand },
        drawerHeaderProps: { brand }
      })}>
      <NotebookExamplePage page={page} />
    </Notebook>
  )
}
