import { webDocumentSchema } from '@vezham/tamizhi-contracts'
import type { ToolActivity, WebSource } from '@vezham/tamizhi-contracts'

export const ResearchSources = ({
  activities
}: {
  activities: ToolActivity[]
}) => {
  const sources = new Map<string, WebSource>()
  for (const event of activities) {
    if (event.type !== 'tool-result' || event.name !== 'web_read') continue
    const parsed = webDocumentSchema.safeParse(event.output)
    if (parsed.success)
      for (const source of parsed.data.sources ?? []) {
        if (source.url.startsWith('https://')) sources.set(source.url, source)
      }
  }
  if (!sources.size) return null
  return (
    <div
      aria-label="Research sources"
      className="text-muted flex flex-wrap items-center gap-2 px-4 py-2 text-xs">
      <span>Sources</span>
      {[...sources.values()].map(source => (
        <a
          key={source.url}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline">
          {source.title || source.domain}
        </a>
      ))}
    </div>
  )
}
