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
