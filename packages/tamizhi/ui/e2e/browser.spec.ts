import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const openSettings = async (page: Page) => {
  await page.getByRole('button', { name: 'More', exact: true }).last().click()
  const menuItem = page.getByRole('menuitem', {
    name: 'Tuning',
    exact: true
  })
  if (await menuItem.count()) await menuItem.click()
  else await page.getByRole('button', { name: 'Tuning', exact: true }).click()
  await page.getByRole('button', { name: 'AI settings' }).click()
  await expect(
    page.getByRole('dialog', { name: 'Tamizhi settings' })
  ).toBeVisible()
}
const connect = async (page: Page) => {
  await page.goto('/chat/new')
  const authenticated = page.waitForResponse(
    response =>
      response.url().endsWith('/api/tamizhi/capabilities') &&
      response.status() === 200
  )
  await page
    .getByRole('button', { name: 'Sign in', exact: true })
    .first()
    .click()
  await page
    .getByRole('button', { name: 'Continue with Google', exact: true })
    .click()
  await authenticated
  await page.waitForLoadState('domcontentloaded')
  await expect(page).toHaveURL(/4399\/chat\/new/)
  await openSettings(page)
  const dialog = page.getByRole('dialog', { name: 'Tamizhi settings' })
  await expect(dialog.getByText('Browser User', { exact: true })).toBeVisible()
  await dialog.getByLabel(/^(Replace )?API key$/).fill('browser-fixture-key')
  await dialog.getByRole('button', { name: 'Test & save key' }).click()
  await expect(dialog.getByRole('status')).toContainText('connected')
  await expect(
    dialog.getByLabel('Replace API key', { exact: true })
  ).toHaveValue('')
  await dialog.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(dialog).toBeHidden()
  await page.getByRole('button', { name: 'Close Tuning' }).click()
}
test('browser OIDC login, BYOK, image chat, recording and playback', async ({
  page,
  context,
  request
}) => {
  await page.addInitScript(() => {
    let played = 0
    Object.defineProperty(window, 'tamizhiBrowserPlayback', {
      get: () => played
    })
    const play = HTMLMediaElement.prototype.play
    HTMLMediaElement.prototype.play = async function (this: HTMLMediaElement) {
      await play.call(this)
      played++
    }
  })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await context.grantPermissions(['microphone'], {
    origin: 'http://127.0.0.1:4399'
  })
  await connect(page)
  await page
    .getByRole('textbox', { name: 'Message Tamizhi' })
    .fill('Describe this image')
  await page.locator('input[type=file]').setInputFiles({
    name: 'pixel.png',
    mimeType: 'image/png',
    buffer: Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/j9sAAAAASUVORK5CYII=',
      'base64'
    )
  })
  await expect(
    page.getByRole('button', { name: 'Remove pixel.png' })
  ).toBeVisible()
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(
    page.locator('.tamizhi-message--assistant').last()
  ).toContainText('Browser verified reply.')
  await expect
    .poll(
      async () =>
        (await (await request.get('http://127.0.0.1:4397/metrics')).json())
          .imageRequests
    )
    .toBeGreaterThan(0)
  await page.getByRole('button', { name: 'Voice input', exact: true }).click()
  const capture = await Promise.race([
    page
      .getByRole('button', { name: 'Finish recording' })
      .waitFor()
      .then(() => 'recording'),
    page
      .getByRole('alert')
      .filter({ hasText: 'Audio recording is not supported in this browser.' })
      .waitFor()
      .then(() => 'unsupported')
  ])
  if (capture === 'recording') {
    await page.waitForTimeout(1200)
    await page.getByRole('button', { name: 'Finish recording' }).click()
    await expect(
      page.getByRole('textbox', { name: 'Message Tamizhi' })
    ).toHaveValue('Dictated in browser')
    expect(
      (await (await request.get('http://127.0.0.1:4397/metrics')).json())
        .audioBytes
    ).toBeGreaterThan(500)
  } else {
    test.info().annotations.push({
      type: 'environment',
      description:
        'Native getUserMedia returns NotSupportedError on this host; recording was not verified.'
    })
  }
  await page.getByRole('button', { name: 'Read aloud' }).last().click()
  await expect
    .poll(
      async () =>
        (await (await request.get('http://127.0.0.1:4397/metrics')).json())
          .speech
    )
    .toBeGreaterThan(0)
  await expect
    .poll(() =>
      page.evaluate(() => Reflect.get(window, 'tamizhiBrowserPlayback'))
    )
    .toBeGreaterThan(0)
  await expect(page.getByText('Unable to play this response.')).toHaveCount(0)
  const stored = await page.evaluate(() => JSON.stringify({ ...localStorage }))
  expect(stored).not.toContain('browser-fixture-key')
  await page
    .getByRole('button', { name: 'Tamizhi AI', exact: true })
    .last()
    .click()
  const embed = page.locator('.tamizhi-embed')
  await expect(embed).toBeVisible()
  await expect(
    embed.getByRole('button', { name: 'Voice input', exact: true })
  ).toBeVisible()
  await embed
    .getByRole('textbox', { name: 'Message Tamizhi' })
    .fill('Hello from embed')
  await embed.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(
    embed.locator('.tamizhi-message--assistant').last()
  ).toContainText('Browser verified reply.')
  expect(errors).toEqual([])
})
test('compact BYOK settings and microphone failure feedback', async ({
  page,
  context
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await connect(page)
  await context.grantPermissions([], { origin: 'http://127.0.0.1:4399' })
  await expect
    .poll(() =>
      page.evaluate(
        async () =>
          (
            await navigator.permissions.query({
              name: 'microphone' as PermissionName
            })
          ).state
      )
    )
    .toBe('denied')
  await page.getByRole('button', { name: 'Voice input', exact: true }).click()
  await expect(
    page
      .getByRole('alert')
      .filter({ hasText: /denied|permission|not supported/i })
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1
    )
  ).toBe(true)
})

for (const provider of ['Google', 'Microsoft', 'GitHub', 'Organization SSO']) {
  test(`${provider} sign-in restores the destination and logout revokes the session`, async ({
    page
  }) => {
    await page.goto('/chat/new?from=sso')
    const authenticated = page.waitForResponse(
      response =>
        response.url().endsWith('/api/tamizhi/capabilities') &&
        response.status() === 200
    )
    await page
      .getByRole('button', { name: 'Sign in', exact: true })
      .first()
      .click()
    await page
      .getByRole('button', { name: `Continue with ${provider}`, exact: true })
      .click()
    await authenticated
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(/\/chat\/new\?from=sso$/)
    await page
      .getByRole('button', { name: 'Sign out', exact: true })
      .first()
      .click()
    await expect(
      page.getByRole('button', { name: 'Sign in', exact: true }).first()
    ).toBeVisible()
    const session = await page.request.get(
      'http://127.0.0.1:4398/api/tamizhi/auth/session'
    )
    expect((await session.json()).user).toBeUndefined()
  })
}

test('Google model account connects without an API key and disconnect removes its models', async ({
  page,
  request
}) => {
  await connect(page)
  const chooseGoogle = async () => {
    await page.getByRole('button', { name: 'Choose AI provider' }).click()
    await page
      .getByRole('menuitemradio', { name: /Gemini browser fixture/ })
      .click()
  }
  await openSettings(page)
  await chooseGoogle()
  const dialog = page.getByRole('dialog', { name: 'Tamizhi settings' })
  await dialog.getByLabel('Google Cloud project ID').fill('browser-project')
  await dialog.getByRole('button', { name: 'Connect Google account' }).click()
  await expect(
    page
      .getByText('Google account connected. Its models are now available.', {
        exact: true
      })
      .first()
  ).toBeVisible()
  await page.getByRole('button', { name: 'AI model', exact: true }).click()
  await page.getByText('Gemini account model', { exact: true }).last().click()
  await page
    .getByRole('textbox', { name: 'Message Tamizhi' })
    .fill('Hello through my Google account')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(
    page.locator('.tamizhi-message--assistant').last()
  ).toContainText('Google account reply.')
  expect(
    (await (await request.get('http://127.0.0.1:4397/metrics')).json())
      .googleRequests
  ).toBeGreaterThan(0)
  expect(
    await page.evaluate(() =>
      JSON.stringify({ ...localStorage, ...sessionStorage })
    )
  ).not.toMatch(/browser-google-(access|refresh)/)
  await openSettings(page)
  await chooseGoogle()
  await dialog.getByRole('button', { name: 'Disconnect', exact: true }).click()
  await expect(dialog.getByRole('status')).toContainText('connection removed')
  expect(
    (await (await request.get('http://127.0.0.1:4397/metrics')).json())
      .googleRevocations
  ).toBeGreaterThan(0)
  await dialog.getByRole('button', { name: 'Close', exact: true }).click()
  await page.getByRole('button', { name: 'Close Tuning' }).click()
  await page.getByRole('button', { name: 'AI model', exact: true }).click()
  await expect(
    page.getByText('Gemini account model', { exact: true })
  ).toHaveCount(0)
})

test('named app profiles survive remote chat reloads', async ({ page }) => {
  await connect(page)
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.getByRole('button', { name: 'Choose an assistant' }).click()
  await page.getByRole('menuitemradio', { name: 'CRM', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Choose an assistant' })
  ).toContainText('CRM')
  await expect(
    page.locator('.tamizhi__companion-layer [data-outfit]')
  ).toHaveAttribute('data-outfit', 'planner')
  await page
    .getByRole('textbox', { name: 'Message Tamizhi' })
    .fill('Hello from CRM')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(
    page.locator('.tamizhi-message--assistant').last()
  ).toContainText('Browser verified reply.')
  const identity = page
    .locator('.tamizhi-message--assistant .tamizhi-message__identity')
    .last()
  const avatar = identity.locator('img')
  await expect(avatar).toBeVisible()
  await expect(avatar).toHaveAttribute('width', '28')
  await expect(avatar).toHaveAttribute('height', '28')
  await expect
    .poll(() =>
      avatar.evaluate(
        image =>
          image instanceof HTMLImageElement &&
          image.complete &&
          image.naturalWidth > 0
      )
    )
    .toBe(true)
  await expect(identity.locator('canvas')).toHaveCount(0)
  await page.reload()
  await expect(
    page.locator('.tamizhi-message--assistant [data-outfit]').last()
  ).toHaveAttribute('data-outfit', 'planner')
  await expect(
    page.locator('.tamizhi__companion-layer [data-outfit]')
  ).toHaveAttribute('data-outfit', 'planner')
  expect(errors).toEqual([])
})

test('named app profiles can be selected on compact screens', async ({
  page
}) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/chat/new')
  await page.getByRole('button', { name: 'Choose an assistant' }).click()
  await page
    .getByRole('searchbox', { name: 'Search assistants' })
    .fill('School')
  const popup = await page.locator('.tamizhi-bots').boundingBox()
  if (!popup) throw new Error('Assistant picker is not visible')
  expect(popup.x).toBeGreaterThanOrEqual(0)
  expect(popup.x + popup.width).toBeLessThanOrEqual(390)
  await page
    .getByRole('menuitemradio', { name: 'School OS', exact: true })
    .click()
  await expect(
    page.getByRole('button', { name: 'Choose an assistant' })
  ).toContainText('School OS')
  await expect(
    page.locator('.tamizhi__companion-layer [data-outfit]')
  ).toHaveAttribute('data-outfit', 'tutor')
  expect(errors).toEqual([])
})

test('V3 theme applies accent colors and appearance without legacy tokens', async ({
  page
}) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/chat/new')
  await expect(
    page.getByRole('button', { name: 'Choose an assistant' })
  ).toBeVisible()
  await page
    .getByRole('button', { name: 'Control center', exact: true })
    .click()
  const dialog = page.getByRole('dialog', {
    name: 'Control Center',
    exact: true
  })
  await expect(dialog).toBeVisible()
  const lightToggle = dialog
    .getByRole('button', {
      name: 'Switch to light mode',
      exact: true
    })
    .first()
  if (await lightToggle.count()) await lightToggle.click()
  await expect
    .poll(() =>
      page
        .locator('html')
        .evaluate(element => element.classList.contains('dark'))
    )
    .toBe(false)
  const lightBackground = await page
    .locator('html')
    .evaluate(element =>
      getComputedStyle(element).getPropertyValue('--background').trim()
    )
  const primary = page.locator('button[aria-label="Send message"]')
  const beforeAccent = await primary.evaluate(
    element => getComputedStyle(element).backgroundColor
  )
  await dialog.getByRole('button', { name: 'Theme', exact: true }).click()
  await dialog.getByRole('option', { name: 'Purple', exact: true }).click()
  await expect
    .poll(() =>
      page
        .locator('html')
        .evaluate(element =>
          getComputedStyle(element).getPropertyValue('--accent').trim()
        )
    )
    .toBe('#7d3fc8')
  await expect
    .poll(() =>
      primary.evaluate(element => getComputedStyle(element).backgroundColor)
    )
    .not.toBe(beforeAccent)
  await expect
    .poll(() =>
      page
        .locator('html')
        .evaluate(element =>
          getComputedStyle(element).getPropertyValue('--focus').trim()
        )
    )
    .toBe('#7d3fc8')
  await dialog
    .getByRole('button', { name: 'Back to Control Center', exact: true })
    .click()
  await dialog
    .getByRole('button', { name: 'Switch to dark mode', exact: true })
    .first()
    .click()
  await expect
    .poll(() =>
      page
        .locator('html')
        .evaluate(element => element.classList.contains('dark'))
    )
    .toBe(true)
  const darkBackground = await page
    .locator('html')
    .evaluate(element =>
      getComputedStyle(element).getPropertyValue('--background').trim()
    )
  expect(darkBackground).not.toBe(lightBackground)
  const tokens = await page.locator('html').evaluate(element => {
    const styles = getComputedStyle(element)
    return {
      accent: styles.getPropertyValue('--accent').trim(),
      legacy: styles.getPropertyValue('--heroui-primary').trim()
    }
  })
  expect(tokens).toEqual({ accent: '#7d3fc8', legacy: '' })
  expect(errors).toEqual([])
})

test('welcome assistant picker supports search, keyboard selection, and recent choices', async ({
  page
}) => {
  await page.goto('/chat/new')
  const trigger = page.getByRole('button', { name: 'Choose an assistant' })
  await trigger.click()
  const search = page.getByRole('searchbox', { name: 'Search assistants' })
  await expect(search).toBeFocused()
  await search.fill('DEVELOPMENT')
  await expect(page.getByRole('menuitemradio')).toHaveCount(5)
  await search.fill('nothing-matches')
  await expect(page.getByText('No matching assistants.')).toBeVisible()
  await search.fill('Bug Tracker')
  await search.press('ArrowDown')
  await search.press('Enter')
  await expect(trigger).toContainText('Bug Tracker')
  await trigger.click()
  await expect(search).toHaveValue('')
  await expect(
    page.getByRole('menuitemradio', { name: 'Bug Tracker', exact: true })
  ).toHaveCount(1)
  await expect(
    page
      .getByRole('group', { name: 'Recent', exact: true })
      .getByRole('menuitemradio', { name: 'Bug Tracker', exact: true })
  ).toHaveAttribute('aria-checked', 'true')
  await search.press('Escape')
  await expect(trigger).toBeFocused()
  await page.reload()
  await trigger.click()
  await expect(
    page
      .getByRole('group', { name: 'Recent', exact: true })
      .getByRole('menuitemradio', { name: 'Bug Tracker', exact: true })
  ).toBeVisible()
})

test('Tuning profiles display outfit image previews', async ({ page }) => {
  await page.goto('/chat/new')
  await page.getByRole('button', { name: 'More', exact: true }).last().click()
  await page.getByRole('menuitem', { name: 'Tuning', exact: true }).click()
  await page.getByRole('button', { name: 'Choose test profile' }).click()
  const menu = page.getByRole('menu', { name: 'Choose test profile' })
  const options = menu.getByRole('menuitemradio')
  await expect(options).toHaveCount(18)
  for (const option of await options.all()) {
    await option.scrollIntoViewIfNeeded()
    await expect(option.locator('img')).toHaveCount(1, { timeout: 45_000 })
  }
  const images = menu.locator('img')
  await expect(images).toHaveCount(18)
  await expect
    .poll(
      () =>
        images.evaluateAll(items =>
          items.every(image => image.complete && image.naturalWidth > 0)
        ),
      { timeout: 45_000 }
    )
    .toBe(true)
  await expect(menu.locator('canvas')).toHaveCount(0)
  await menu.getByRole('menuitemradio', { name: /^School OS/ }).click()
  await expect(
    page.getByRole('button', { name: 'Choose test profile' })
  ).toContainText('School OS')
  await expect(
    page.locator('.tamizhi__companion-layer [data-outfit]')
  ).toHaveAttribute('data-outfit', 'tutor')
})

test('backend settings actions preserve conversations, checkpoints, and memory', async ({
  page
}) => {
  await connect(page)
  await page
    .getByRole('textbox', { name: 'Message Tamizhi' })
    .fill('Audit settings regression')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(
    page.locator('.tamizhi-message--assistant').last()
  ).toContainText('Browser verified reply.')
  await openSettings(page)
  const dialog = page.getByRole('dialog', { name: 'Tamizhi settings' })
  await dialog.getByLabel('Search chats').fill('Audit settings regression')
  await dialog.getByRole('button', { name: 'Search', exact: true }).click()
  await dialog
    .getByRole('button', { name: 'Audit settings regression', exact: true })
    .click()
  await expect(dialog).toBeHidden()
  await openSettings(page)
  await dialog
    .getByLabel('Title', { exact: true })
    .fill('Audit renamed conversation')
  const renamed = page.waitForResponse(
    response =>
      response.request().method() === 'PATCH' &&
      /\/conversations\/[^/]+$/.test(new URL(response.url()).pathname) &&
      response.status() === 200
  )
  await dialog.getByRole('button', { name: 'Rename', exact: true }).click()
  await renamed
  await expect(dialog.getByLabel('Title', { exact: true })).toHaveValue('')
  await dialog
    .getByRole('button', { name: 'Save checkpoint', exact: true })
    .click()
  await expect(dialog.getByText(/^Saved checkpoint ·.* UTC$/)).toBeVisible()
  await dialog.getByLabel('Remember a fact').fill('Audit memory regression')
  await dialog.getByRole('button', { name: 'Remember', exact: true }).click()
  const fact = dialog.getByText('Audit memory regression', { exact: true })
  await expect(fact).toBeVisible()
  await expect(dialog.getByLabel('Remember a fact')).toHaveValue('')
  await fact
    .locator('..')
    .getByRole('button', { name: 'Forget', exact: true })
    .click()
  await expect(fact).toHaveCount(0)
})
