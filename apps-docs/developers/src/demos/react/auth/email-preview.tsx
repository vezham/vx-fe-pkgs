import { type ReactNode, useEffect, useState } from 'react'

type Props = { children: ReactNode; title: string }

export const EmailPreview = ({ children, title }: Props) => {
  const [html, setHtml] = useState<string>()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    void (async () => {
      try {
        const { renderToReadableStream } = await import('react-dom/server')
        const stream = await renderToReadableStream(children)
        const value = await new Response(stream).text()
        if (active) setHtml(value)
      } catch {
        if (active) setFailed(true)
      }
    })()
    return () => {
      active = false
    }
  }, [children])

  if (failed) return <p role="alert">The email preview could not render.</p>
  if (!html) return <p role="status">Rendering email…</p>
  return (
    <iframe
      title={title}
      srcDoc={html}
      sandbox=""
      className="h-[680px] w-full rounded-lg border bg-white"
    />
  )
}
