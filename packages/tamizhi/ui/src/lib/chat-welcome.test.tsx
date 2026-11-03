import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'

import { TamizhiChat } from './chat'
import { TamizhiEmbed } from './embed'
import { TamizhiSessionProvider, useTamizhiSession } from './session'

it.each([
  ['vezham-crm', 'How can I help with CRM?'],
  ['vezham-school-os', 'How can I help with School OS?'],
  ['vezham-tamizhi', 'How can I help?'],
  ['unknown-app', 'How can I help?']
])(
  'uses the host profile greeting without a profile switcher in %s embeds',
  (appId, greeting) => {
    const markup = renderToStaticMarkup(
      <TamizhiSessionProvider appId={appId}>
        <TamizhiEmbed />
      </TamizhiSessionProvider>
    )
    expect(markup).toContain(greeting)
    expect(markup).not.toContain('Who’s helping?')
    expect(markup).not.toContain('Choose an assistant')
  }
)

const StandaloneWelcome = () => {
  const session = useTamizhiSession()
  return <TamizhiChat {...session} renderLayout={content => content} />
}

it('retains the profile picker for the standalone welcome', () => {
  const markup = renderToStaticMarkup(
    <TamizhiSessionProvider appId="vezham-crm">
      <StandaloneWelcome />
    </TamizhiSessionProvider>
  )
  expect(markup).toContain('Who’s helping?')
  expect(markup).toContain('Choose an assistant')
  expect(markup).not.toContain('How can I help with CRM?')
})
