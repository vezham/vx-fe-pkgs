import {
  Children,
  type ComponentProps,
  Fragment,
  type ReactElement,
  type ReactNode,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import { CodeBlock, Pre } from '@vezham/docs-react/components/codeblock'
import { Button, Tabs } from '@vezham/react-v3'

const COLLAPSED_HEIGHT = 840

const PreviewCodeBlock = ({
  children,
  className,
  isTabbed = false,
  ...props
}: ComponentProps<typeof CodeBlock> & { isTabbed?: boolean }) => {
  const figure = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const collapsePosition = useRef<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [canExpand, setCanExpand] = useState(false)
  const sourceId = useId()

  useEffect(() => {
    const element = figure.current
    if (!element) return
    let active = true
    const measure = () => {
      if (active) setCanExpand(element.scrollHeight > COLLAPSED_HEIGHT)
    }
    if (typeof ResizeObserver === 'undefined') {
      queueMicrotask(measure)
      return () => {
        active = false
      }
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => {
      active = false
      observer.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    const previousTop = collapsePosition.current
    collapsePosition.current = null
    if (expanded || previousTop === null || !toggle.current) return
    // vx-bot/NOTE: Keep the clicked control in place when the full source shrinks.
    const delta = toggle.current.getBoundingClientRect().top - previousTop
    if (Math.abs(delta) > 1)
      window.scrollBy({ top: delta, behavior: 'instant' })
  }, [expanded])

  return (
    <div className="relative [overflow-anchor:none]">
      <div
        className={[
          expanded ? 'pb-10' : 'overflow-clip',
          canExpand && !expanded
            ? '[mask-image:linear-gradient(to_bottom,#000_75%,transparent)]'
            : ''
        ].join(' ')}
        style={{ maxHeight: expanded ? undefined : COLLAPSED_HEIGHT }}>
        <CodeBlock
          {...props}
          ref={figure}
          data-line-numbers
          className={`${className ?? ''} bg-background m-0 shadow-none ${isTabbed ? 'rounded-none border-0' : 'rounded-xl'}`}
          viewportProps={{
            id: sourceId,
            'aria-label': 'Example source code',
            className: 'max-h-none'
          }}>
          <Pre>{children}</Pre>
        </CodeBlock>
      </div>
      {canExpand && (
        <Button
          ref={toggle}
          aria-controls={sourceId}
          aria-expanded={expanded}
          className="bg-surface absolute right-1/2 bottom-2 translate-x-1/2 text-xs shadow-sm shadow-black/5"
          size="sm"
          variant="tertiary"
          onPress={() => {
            if (expanded && toggle.current)
              collapsePosition.current =
                toggle.current.getBoundingClientRect().top
            setExpanded(value => !value)
          }}>
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  )
}

const flattenSource = (children: ReactNode): ReactNode[] =>
  Children.toArray(children).flatMap(child => {
    // vx-bot/NOTE: MDX wraps fenced files in fragments, so flatten them before grouping.
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === Fragment
    )
      return flattenSource(child.props.children)
    return [child]
  })

export const PreviewSource = ({ children }: { children?: ReactNode }) => {
  const nodes = flattenSource(children)
  const files = nodes.filter(
    (child): child is ReactElement<ComponentProps<typeof CodeBlock>> =>
      isValidElement(child)
  )

  if (files.length < 2)
    return nodes.map((child, index) =>
      isValidElement<ComponentProps<typeof CodeBlock>>(child) ? (
        <PreviewCodeBlock key={index} {...child.props} />
      ) : (
        child
      )
    )

  return (
    <>
      {nodes.filter(child => !isValidElement(child))}
      <Tabs
        defaultSelectedKey="file-0"
        variant="primary"
        className="bg-background gap-0 overflow-hidden rounded-xl border">
        <div className="min-w-0 border-b px-2 py-1.5">
          <Tabs.ListContainer className="w-fit max-w-full rounded-full">
            <Tabs.List aria-label="Source files" className="p-0.5">
              {files.map((file, index) => (
                <Tabs.Tab
                  key={index}
                  id={`file-${index}`}
                  className="h-7 w-auto px-2.5 text-xs font-normal whitespace-nowrap">
                  {file.props.title || `File ${index + 1}`}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </div>
        {files.map((file, index) => (
          <Tabs.Panel
            key={index}
            id={`file-${index}`}
            className="m-0 min-w-0 p-0">
            <PreviewCodeBlock
              {...file.props}
              title={undefined}
              icon={undefined}
              isTabbed
            />
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  )
}
