import {
  type CSSProperties,
  Component,
  type ReactNode,
  Suspense,
  type SyntheticEvent,
  lazy,
  useEffect,
  useRef,
  useState
} from 'react'

import { Code, Eye } from '@vezham/icons-react'
import { Button, Tabs } from '@vezham/react-v3'

import { demos as ossDemos } from '@src/demos/heroui'
import { proDemos } from '@src/demos/heroui-pro'

import { PreviewSource } from './source'

const demos = { ...ossDemos, ...proDemos }

type Props = {
  children?: ReactNode
  name: string
  align?: 'center' | 'start' | 'end'
  isBgSolid?: boolean
  minHeight?: string
  style?: CSSProperties
}

type BoundaryProps = {
  children: ReactNode
  onRetry: () => void
}

class PreviewBoundary extends Component<BoundaryProps, { failed: boolean }> {
  override state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  override render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="flex flex-col items-center gap-3 text-sm">
        <p>This preview could not load.</p>
        <Button variant="secondary" onPress={this.props.onRetry}>
          Retry preview
        </Button>
      </div>
    )
  }
}

const createDemo = (entry: (typeof demos)[string]) =>
  lazy(async () => ({ default: await entry.loader() }))

const previews: Partial<Record<string, ReturnType<typeof createDemo>>> =
  Object.fromEntries(
    Object.entries(demos).map(([name, entry]) => [name, createDemo(entry)])
  )

const preventPlaceholderNavigation = (event: SyntheticEvent) => {
  const target = event.target
  if (
    target instanceof Element &&
    target.closest('a')?.getAttribute('href') === '#'
  )
    event.preventDefault()
}

export const ComponentPreview = ({
  children,
  name,
  align = 'center',
  isBgSolid,
  minHeight,
  style
}: Props) => {
  const container = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const Demo = previews[name]
  const retry = () => {
    const entry = demos[name]
    if (!entry) return
    previews[name] = createDemo(entry)
    setAttempt(value => value + 1)
  }

  useEffect(() => {
    const element = container.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') {
      let active = true
      queueMicrotask(() => {
        if (active) setVisible(true)
      })
      return () => {
        active = false
      }
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(item => item.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={container}
      style={style}
      data-component-preview={name}
      className="not-prose my-6 min-w-0">
      <Tabs defaultSelectedKey="preview" className="gap-3">
        <Tabs.ListContainer className="w-fit max-w-full self-start rounded-full">
          <Tabs.List aria-label={`Example: ${name}`} className="p-0.5">
            <Tabs.Tab
              id="preview"
              className="h-7 w-auto gap-1.5 px-2.5 text-xs font-normal">
              <Eye size={14} aria-hidden="true" className="shrink-0" />
              Preview
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab
              id="code"
              className="h-7 w-auto gap-1.5 px-2.5 text-xs font-normal">
              <Code size={14} aria-hidden="true" className="shrink-0" />
              Code
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel id="preview" className="m-0 p-0">
          <div
            style={{ minHeight }}
            className={`relative isolate flex min-h-40 w-full overflow-x-auto rounded-xl border p-6 sm:p-8 ${isBgSolid ? 'bg-background' : ''} ${align === 'start' ? 'items-start justify-start' : align === 'end' ? 'items-end justify-end' : 'items-center justify-center'}`}
            onClickCapture={preventPlaceholderNavigation}
            onKeyDownCapture={event => {
              if (event.key === 'Enter') preventPlaceholderNavigation(event)
            }}>
            {visible && Demo ? (
              <PreviewBoundary key={`${name}:${attempt}`} onRetry={retry}>
                <Suspense
                  fallback={
                    <p role="status" className="text-muted text-sm">
                      Loading example…
                    </p>
                  }>
                  <Demo />
                </Suspense>
              </PreviewBoundary>
            ) : (
              <p role="status" className="text-muted text-sm">
                {Demo ? 'Loading example…' : 'Example unavailable.'}
              </p>
            )}
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="code" className="m-0 min-w-0 p-0">
          <PreviewSource>{children}</PreviewSource>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
