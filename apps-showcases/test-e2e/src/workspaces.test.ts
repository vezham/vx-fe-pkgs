import type { Page } from '@playwright/test'

import { expect, test } from '@vezham/config/playwright/test'

const openAccount = async (page: Page) => {
  await page.getByRole('button', { name: 'Open Guest menu' }).click()
  await expect(
    page
      .getByRole('dialog', { name: 'Account', exact: true })
      .or(page.getByRole('menu', { name: 'Open Guest menu', exact: true }))
  ).toBeInViewport({ ratio: 1 })
}
const openAssistant = async (page: Page) => {
  if (await page.locator('.tamizhi-embed').isVisible()) return
  const trigger = page
    .getByRole('button', { name: 'Tamizhi AI', exact: true })
    .last()
  if (!(await trigger.isVisible())) await openAccount(page)
  await trigger.click()
  const expand = page.getByRole('button', {
    name: 'Expand Tamizhi AI',
    exact: true
  })
  if (await expand.isVisible()) await expand.click()
}
const closeAssistantSheet = async (page: Page) => {
  const close = page.getByRole('button', {
    name: 'Close Tamizhi AI',
    exact: true
  })
  if (await close.isVisible()) {
    await close.click()
    await expect(close).toHaveCount(0)
    const account = page.getByRole('dialog', { name: 'Account', exact: true })
    await account
      .getByRole('button', { name: 'Close Account', exact: true })
      .click()
    await expect(account).toHaveCount(0)
  }
}
const menuAction = (page: Page, name: string) =>
  page
    .getByRole('menuitem', { name, exact: true })
    .or(page.getByRole('button', { name, exact: true }))

const openWorkspaces = async (page: Page) => {
  await openAccount(page)
  await menuAction(page, 'Choose workspace').click()
}
const createWorkspace = async (page: Page, name: string) => {
  await openWorkspaces(page)
  await menuAction(page, 'Create workspace').click()
  const dialog = page.getByRole('dialog', { name: 'Name your workspace' })
  await expect(
    dialog.getByRole('button', { name: 'Create workspace', exact: true })
  ).toBeDisabled()
  await dialog.getByRole('textbox', { name: 'Workspace name' }).fill(name)
  await dialog
    .getByRole('button', { name: 'Create workspace', exact: true })
    .click()
  await expect(dialog).toHaveCount(0)
  await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
}

test('local workspaces keep isolated notes across switching, reloads, and offline edits', async ({
  page,
  context
}) => {
  await page.goto('/')
  const notes = page.getByRole('textbox', { name: 'Workspace notes' })
  await expect(
    page.getByRole('heading', { name: 'My Workspace', exact: true })
  ).toBeVisible()
  await notes.fill('Notes in the default workspace')
  await createWorkspace(page, 'Design team')
  await expect(notes).toHaveValue('')
  await notes.fill('Design notes')
  await expect(page.getByRole('status')).toHaveText('Saved in this browser')
  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'Design team', exact: true })
  ).toBeVisible()
  await expect(notes).toHaveValue('Design notes')
  await openWorkspaces(page)
  await menuAction(page, 'My Workspace').click()
  await expect(notes).toHaveValue('Notes in the default workspace')
  await context.setOffline(true)
  await createWorkspace(page, 'Offline project')
  await notes.fill('Written offline')
  await openWorkspaces(page)
  await menuAction(page, 'Design team').click()
  await expect(notes).toHaveValue('Design notes')
  await context.setOffline(false)
  await page.reload()
  await openWorkspaces(page)
  await menuAction(page, 'Offline project').click()
  await expect(notes).toHaveValue('Written offline')
  await openAssistant(page)
  const assistant = page.locator('.tamizhi-embed')
  await assistant
    .getByRole('textbox', { name: 'Message Tamizhi' })
    .fill('Hello from the offline project')
  await assistant
    .getByRole('button', { name: 'Send message', exact: true })
    .click()
  await expect(
    assistant.getByRole('article', { name: 'Your message' })
  ).toContainText('Hello from the offline project')
  await closeAssistantSheet(page)
  await openWorkspaces(page)
  await menuAction(page, 'Design team').click()
  await openAssistant(page)
  await expect(
    assistant.getByRole('article', { name: 'Your message' })
  ).toHaveCount(0)
  await assistant.getByRole('button', { name: 'Choose a Tamizhi chat' }).click()
  await expect(
    page.getByRole('menuitem', {
      name: 'Hello from the offline project',
      exact: true
    })
  ).toHaveCount(0)
  await page.keyboard.press('Escape')

  await closeAssistantSheet(page)
  await openWorkspaces(page)
  await menuAction(page, 'Offline project').click()
  await openAssistant(page)
  await assistant.getByRole('button', { name: 'Choose a Tamizhi chat' }).click()
  await page
    .getByRole('menuitem', {
      name: 'Hello from the offline project',
      exact: true
    })
    .click()
  await expect(
    assistant.getByRole('article', { name: 'Your message' })
  ).toContainText('Hello from the offline project')
})

test('compact workspace switcher opens a bottom sheet and creates local workspaces', async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await createWorkspace(page, 'Mobile project')
  await openAccount(page)
  const sheet = page.getByRole('dialog', { name: 'Account', exact: true })
  await expect(sheet).toBeVisible()
  await expect(sheet.getByText('Guest', { exact: true })).toBeVisible()
  await expect(
    sheet.getByRole('button', { name: 'Available', exact: true })
  ).toBeVisible()
  await expect(
    sheet.getByRole('button', { name: 'Update your status', exact: true })
  ).toBeVisible()
  await sheet
    .getByRole('button', { name: 'Choose workspace', exact: true })
    .click()
  await sheet
    .getByRole('button', { name: 'Back to account menu', exact: true })
    .click()
  await expect(sheet).toBeInViewport({ ratio: 1 })
  await expect(
    sheet.getByRole('button', { name: 'Available', exact: true })
  ).toBeVisible()
  await sheet
    .getByRole('button', { name: 'Choose workspace', exact: true })
    .click()
  await sheet.getByRole('button', { name: 'My Workspace', exact: true }).click()
  await expect(
    page.getByRole('heading', { name: 'My Workspace', exact: true })
  ).toBeVisible()
})

test('shares committed workspace records across tabs without storing content in localStorage', async ({
  page,
  context
}) => {
  await page.goto('/')
  const other = await context.newPage()
  await other.goto('/')
  await createWorkspace(page, 'Shared local project')
  await expect(
    other.getByRole('heading', { name: 'Shared local project', exact: true })
  ).toBeVisible()
  const firstNotes = page.getByRole('textbox', { name: 'Workspace notes' })
  await firstNotes.fill('Shared through IndexedDB')
  await expect(
    other.getByRole('textbox', { name: 'Workspace notes' })
  ).toHaveValue('Shared through IndexedDB')
  const storage = await page.evaluate(async () => {
    const request = indexedDB.open('vezham', 1)
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    const transaction = database.transaction('records', 'readonly')
    const records = transaction.objectStore('records').getAll()
    const values = await new Promise<unknown[]>((resolve, reject) => {
      records.onsuccess = () => resolve(records.result)
      records.onerror = () => reject(records.error)
    })
    database.close()
    return { local: { ...localStorage }, values }
  })
  expect(storage.values).toContain('Shared through IndexedDB')
  expect(JSON.stringify(storage.local)).not.toContain(
    'Shared through IndexedDB'
  )
  expect(
    Object.keys(storage.local).some(
      key => key.endsWith(':workspaces') || key.includes(':workspace:')
    )
  ).toBe(false)
  expect(
    Object.keys(storage.local).some(key => key.endsWith(':current-workspace'))
  ).toBe(true)
  await other.close()
})

test('combined guest menu opens account settings without signing in', async ({
  page
}) => {
  await page.goto('/')
  await expect(
    page.getByRole('button', { name: 'Open Guest menu' })
  ).toHaveCount(1)
  await openAccount(page)
  await expect(
    page
      .getByRole('button', { name: /Guest.*Available/ })
      .or(
        page
          .getByRole('dialog', { name: 'Account', exact: true })
          .getByText('Guest', { exact: true })
      )
  ).toBeVisible()
  await expect(menuAction(page, 'Available')).toBeVisible()
  await expect(menuAction(page, 'Update your status')).toBeVisible()
  await expect(menuAction(page, 'Logout')).toHaveCount(0)
  await menuAction(page, 'Preferences').click()
  await expect(page).toHaveURL(/\/settings\?section=Account$/)
  await expect(
    page.getByRole('heading', { name: 'Account', exact: true })
  ).toBeVisible()
  await page.goBack()
  await expect(
    page.getByRole('heading', { name: 'My Workspace', exact: true })
  ).toBeVisible()
})

for (const mobile of [false, true]) {
  const viewport = mobile
    ? { width: 390, height: 844 }
    : { width: 1280, height: 900 }

  test(`rename and delete workspaces independently of selection (${mobile ? 'mobile' : 'desktop'})`, async ({
    page
  }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await createWorkspace(page, 'Disposable workspace')
    const notes = page.getByRole('textbox', { name: 'Workspace notes' })
    await notes.fill('Workspace data to remove')
    await expect(page.getByRole('status')).toHaveText('Saved in this browser')
    await openWorkspaces(page)
    await page
      .getByRole('button', { name: 'Options for My Workspace', exact: true })
      .click()
    await page.getByRole('menuitem', { name: 'Rename', exact: true }).click()
    await page
      .getByRole('dialog', { name: 'Rename workspace', exact: true })
      .getByRole('button', { name: 'Cancel', exact: true })
      .click()
    await expect(
      page.getByRole('heading', { name: 'Disposable workspace', exact: true })
    ).toBeVisible()
    const selectedId = await page.evaluate(() => {
      const key = Object.keys(localStorage).find(key =>
        key.endsWith(':current-workspace')
      )
      return key
        ? (JSON.parse(localStorage.getItem(key) ?? 'null') as string)
        : null
    })
    await openWorkspaces(page)
    await page
      .getByRole('button', {
        name: 'Options for Disposable workspace',
        exact: true
      })
      .click()
    await page.getByRole('menuitem', { name: 'Rename', exact: true }).click()
    const rename = page.getByRole('dialog', {
      name: 'Rename workspace',
      exact: true
    })
    await expect(
      rename.getByRole('textbox', { name: 'Workspace name' })
    ).toHaveValue('Disposable workspace')
    await rename
      .getByRole('textbox', { name: 'Workspace name' })
      .fill('Renamed workspace')
    await rename.getByRole('button', { name: 'Save name', exact: true }).click()
    await expect(rename).toHaveCount(0)
    await expect(
      page.getByRole('heading', { name: 'Renamed workspace', exact: true })
    ).toBeVisible()
    await expect(notes).toHaveValue('Workspace data to remove')
    await page.reload()
    await expect(
      page.getByRole('heading', { name: 'Renamed workspace', exact: true })
    ).toBeVisible()
    await openWorkspaces(page)
    await page
      .getByRole('button', {
        name: 'Options for Renamed workspace',
        exact: true
      })
      .click()
    await page.getByRole('menuitem', { name: 'Delete', exact: true }).click()
    const deletion = page.getByRole('dialog', {
      name: 'Delete workspace',
      exact: true
    })
    await expect(deletion).toContainText('Renamed workspace')
    await deletion.getByRole('button', { name: 'Cancel', exact: true }).click()
    await expect(
      page.getByRole('heading', { name: 'Renamed workspace', exact: true })
    ).toBeVisible()
    await openWorkspaces(page)
    await page
      .getByRole('button', {
        name: 'Options for Renamed workspace',
        exact: true
      })
      .click()
    await page.getByRole('menuitem', { name: 'Delete', exact: true }).click()
    await deletion
      .getByRole('button', { name: 'Delete workspace', exact: true })
      .click()
    await expect(deletion).toHaveCount(0)
    await expect(
      page.getByRole('heading', { name: 'My Workspace', exact: true })
    ).toBeVisible()
    await expect(notes).toHaveValue('')
    await page.reload()
    await expect(
      page.getByRole('heading', { name: 'My Workspace', exact: true })
    ).toBeVisible()
    const remainingKeys = await page.evaluate(async () => {
      const request = indexedDB.open('vezham', 1)
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
      const keysRequest = db
        .transaction('records', 'readonly')
        .objectStore('records')
        .getAllKeys()
      const keys = await new Promise<IDBValidKey[]>((resolve, reject) => {
        keysRequest.onsuccess = () => resolve(keysRequest.result)
        keysRequest.onerror = () => reject(keysRequest.error)
      })
      db.close()
      return keys.map(String)
    })
    expect(selectedId).toBeTruthy()
    expect(
      remainingKeys.some(key => key.includes(`:workspace:${selectedId}:`))
    ).toBe(false)
    await openWorkspaces(page)
    await expect(
      page.getByRole(mobile ? 'button' : 'menuitem', {
        name: 'Renamed workspace',
        exact: true
      })
    ).toHaveCount(0)
    await page
      .getByRole('button', { name: 'Options for My Workspace', exact: true })
      .click()
    await expect(
      page.getByRole('menuitem', { name: 'Delete', exact: true })
    ).toHaveAttribute('aria-disabled', 'true')
  })
}
