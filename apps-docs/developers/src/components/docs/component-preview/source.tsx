import {
  Children,
  type ComponentProps,
  Fragment,
  type ReactNode,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import { CodeBlock, Pre } from '@vezham/docs-react/components/codeblock'
import { Button } from '@vezham/react-v3'

const COLLAPSED_HEIGHT = 840

const PreviewCodeBlock = ({
  children,
  className,
  ...props
}: ComponentProps<typeof CodeBlock>) => {
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
          className={`${className ?? ''} bg-background m-0 rounded-xl shadow-none`}
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

export const PreviewSource = ({ children }: { children?: ReactNode }) =>
  Children.map(children, child => {
    if (!isValidElement<ComponentProps<typeof CodeBlock>>(child)) return child
    // vx-bot/NOTE: MDX wraps fenced code in a fragment before passing it to the preview.
    if (child.type === Fragment)
      return <PreviewSource>{child.props.children}</PreviewSource>
    return <PreviewCodeBlock {...child.props} />
  })
