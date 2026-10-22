import { layouts } from './layouts'
import { DocsPageContent } from './page-content'
import { getPageComponents } from './pages'
import type { DocsLayoutProps, DocsPageProps } from './types'

export const DocsLayout = ({ shell = 'docs', ...props }: DocsLayoutProps) => {
  const Layout = layouts[shell]
  return <Layout {...props} />
}

export const DocsPage = ({
  full,
  shell = 'docs',
  toc,
  ...props
}: DocsPageProps) => {
  const { Page, Body, Description, Title } = getPageComponents(shell)
  const content = full ? (
    <Body>{props.children}</Body>
  ) : (
    <DocsPageContent
      {...props}
      Body={Body}
      Description={Description}
      Title={Title}
    />
  )

  if (shell === 'home') {
    return (
      <article
        className={`mx-auto flex w-full min-w-0 flex-col gap-4 px-6 py-10 ${full ? 'max-w-7xl' : 'max-w-4xl'}`}>
        {content}
      </article>
    )
  }

  return (
    <Page full={full} toc={toc}>
      {content}
    </Page>
  )
}
