import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { execFile, spawn } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { build, createServer as createViteServer, resolveConfig } from 'vite'

import { companionDevProxy } from '../../../config/src/lib/presets/app/companion-proxy.ts'

// vx-bot/NOTE: Only inference/source pages are fixtures; CLI, pairing, Go tools, HTTP, TanStack and Chromium are real.
const exec = promisify(execFile)
const workspace = path.resolve(import.meta.dirname, '../../../..')
const backend = process.env.TAMIZHI_BACKEND_DIR
if (!backend)
  throw new Error('Set TAMIZHI_BACKEND_DIR to the Go backend checkout.')
const temporary = await mkdtemp(path.join(tmpdir(), 'tamizhi-companion-'))
const fixtureDirectory = path.join(temporary, 'runtime')
await (await import('node:fs/promises')).mkdir(fixtureDirectory)
let fixture, server, browser, devServer
const companions = []
const assertResearchTools = async page => {
  assert.deepEqual(
    await page.evaluate(() =>
      window.events
        .filter(event => event.type === 'tool')
        .map(event => event.name)
    ),
    ['web_search', 'web_open', 'web_read']
  )
}
try {
  await exec('pnpm', ['exec', 'nx', 'run', 'tamizhi-api:build'], {
    cwd: backend,
    env: {
      ...process.env,
      NX_NO_CLOUD: 'true',
      npm_config_verify_deps_before_run: 'false'
    },
    maxBuffer: 2_000_000
  })
  fixture = spawn(
    'pnpm',
    ['exec', 'nx', 'run', 'tamizhi-core-go:companion-fixture'],
    {
      cwd: backend,
      env: {
        ...process.env,
        NX_NO_CLOUD: 'true',
        npm_config_verify_deps_before_run: 'false',
        TAMIZHI_COMPANION_FIXTURE_DIR: fixtureDirectory
      },
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: process.platform !== 'win32'
    }
  )
  let logs = ''
  fixture.stdout.on('data', value => {
    logs += value
  })
  fixture.stderr.on('data', value => {
    logs += value
  })
  let ready = false
  for (let tries = 0; tries < 120; tries++) {
    if (fixture.exitCode !== null) throw new Error('Fixture failed: ' + logs)
    try {
      ready = (await fetch('http://127.0.0.1:4418/healthz')).ok
    } catch {
      /* vx-bot/NOTE: Wait only for this isolated fixture to bind. */
    }
    if (ready) break
    await new Promise(resolve => setTimeout(resolve, 250))
  }
  assert.ok(ready, 'Fixture failed to start: ' + logs)
  const binary = path.join(backend, 'dist/tamizhi')
  const cliArgs = ['--data-dir', fixtureDirectory, '--listen', '127.0.0.1:4418']
  const source = path.resolve(workspace, 'packages/tamizhi/client/src/index.ts')
  await writeFile(
    path.join(temporary, 'entry.js'),
    `
  import {runTamizhiChat,companionTransport,connectCompanion} from ${JSON.stringify(source)}
  window.connectLocal=async baseURL=>{
   window.connectionError=null;window.connectionReady=false;document.querySelector('#verification').textContent=''
   try {
    const transport=await companionTransport({baseURL,origin:location.origin,isSecureContext:window.isSecureContext})
    const client=await connectCompanion({baseURL,fetch:transport,onPending:prompt=>document.querySelector('#verification').textContent=prompt.code})
    await client.api.session()
    window.connectedModels=await client.models()
    if(window.connectedModels.some(model=>model.id==='leo/default')){
      window.leoAnswer=''
      await runTamizhiChat(client,{conversationId:'leo-fixture-'+Date.now(),model:window.connectedModels.length===1?'Auto':'leo/default',messages:[{role:'user',content:'hi'}],permission:'safe',fast:false},{onText:text=>window.leoAnswer=text})
    }
    window.connectionReady=true
   }catch(error){window.connectionError=error.message}
  }
  window.researchLeo=async()=>{
   window.events=[]
   await runTamizhiChat(window.researchClient,{conversationId:'leo-research-'+Date.now(),model:'leo/default',messages:[{role:'user',content:'/search latest React version'}],permission:'safe',fast:false},{onText:text=>document.querySelector('#answer').textContent=text,onEvent:event=>window.events.push(event)})
  }
  window.research=async (baseURL='http://127.0.0.1:4418/api/tamizhi')=>{
   const transport=await companionTransport({baseURL,origin:location.origin,isSecureContext:window.isSecureContext})
   const client=await connectCompanion({baseURL,fetch:transport})
   await client.api.session()
   window.researchClient=client
   window.events=[]
   await runTamizhiChat(client,{conversationId:'fixture-'+Date.now(),messages:[{role:'user',content:'What is the latest React version?'}],permission:'safe',fast:false},{onText:text=>document.querySelector('#answer').textContent=text,onEvent:event=>window.events.push(event)})
  }
 `
  )
  await build({
    configFile: false,
    logLevel: 'error',
    resolve: { conditions: ['@vx/fe-kit', 'import', 'default'] },
    build: {
      outDir: path.join(temporary, 'app'),
      minify: false,
      lib: {
        entry: path.join(temporary, 'entry.js'),
        name: 'CompanionFixture',
        formats: ['iife'],
        fileName: () => 'app.js'
      }
    }
  })
  const script = await readFile(path.join(temporary, 'app/app.js'))
  server = createServer((request, response) => {
    response.setHeader(
      'Content-Type',
      request.url === '/app.js' ? 'text/javascript' : 'text/html'
    )
    response.end(
      request.url === '/app.js'
        ? script
        : '<!doctype html><main id="answer"></main><div id="verification"></div><script src="/app.js"></script>'
    )
  })
  await new Promise(resolve => server.listen(4419, '127.0.0.1', resolve))
  browser = await chromium.launch({
    headless: true,
    args: [
      '--host-resolver-rules=MAP test.vezham.local 127.0.0.1',
      '--no-proxy-server'
    ]
  })
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  let connectionRequestId
  page.on('request', request => {
    if (request.url().endsWith('/auth/connect/poll'))
      connectionRequestId = request.postDataJSON().requestId
  })
  await page.goto('http://127.0.0.1:4419')
  await page.waitForFunction(() => typeof window.research === 'function')
  await page.evaluate(() => window.research())
  assert.match(await page.locator('#answer').textContent(), /99.0.0/)
  assert.match(
    await page.locator('#answer').textContent(),
    /https:\/\/react.dev\/versions/
  )
  const events = await page.evaluate(() => window.events)
  assert.deepEqual(
    events.filter(event => event.type === 'tool').map(event => event.name),
    ['web_search', 'web_open', 'web_read']
  )
  assert.equal(events.filter(event => event.type === 'client-action').length, 0)
  const readResult = events.find(
    event => event.type === 'tool-result' && event.name === 'web_read'
  )
  assert.ok(readResult, 'Expected a web_read tool result')
  assert.match(readResult.output.sources[0].id, /^web-/)
  await page.evaluate(() => window.researchLeo())
  assert.match(
    await page.locator('#answer').textContent(),
    /From the pages I read/
  )
  assert.match(await page.locator('#answer').textContent(), /99.0.0/)
  assert.match(
    await page.locator('#answer').textContent(),
    /https:\/\/react.dev\/versions/
  )
  await assertResearchTools(page)
  const replay = await page.evaluate(
    async requestId =>
      (
        await fetch('http://127.0.0.1:4418/api/tamizhi/auth/connect/poll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestId })
        })
      ).status,
    connectionRequestId
  )
  assert.equal(replay, 404, 'Connection capability must not be reusable')
  const terminal = await exec(binary, [
    'chat',
    ...cliArgs,
    '--permission',
    'safe',
    '--json',
    'What is the latest React version?'
  ])
  const terminalEvents = terminal.stdout
    .trim()
    .split('\n')
    .map(line => JSON.parse(line))
  assert.ok(
    terminalEvents.some(
      event => event.type === 'text' && event.delta.includes('99.0.0')
    )
  )
  assert.equal(terminalEvents.at(-1).type, 'finish')
  // vx-bot/NOTE: Exercise the real serve command and terminal approval, with an empty allowlist and no model credentials.
  const localDirectory = path.join(temporary, 'interactive')
  let localLogs = ''
  const waitForVerification = async code => {
    for (
      let attempt = 0;
      attempt < 100 && !localLogs.includes('Verification code: ' + code);
      attempt++
    )
      await new Promise(resolve => setTimeout(resolve, 25))
    assert.ok(localLogs.includes('Verification code: ' + code))
  }
  const startLocal = async () => {
    const child = spawn(
      binary,
      ['serve', '--data-dir', localDirectory, '--listen', '127.0.0.1:4420'],
      { stdio: ['pipe', 'pipe', 'pipe'] }
    )
    companions.push(child)
    child.stdout.on('data', data => {
      localLogs += data
    })
    child.stderr.on('data', data => {
      localLogs += data
    })
    for (let attempt = 0; attempt < 100; attempt++) {
      if (child.exitCode !== null)
        throw new Error('Interactive companion failed: ' + localLogs)
      try {
        if ((await fetch('http://127.0.0.1:4420/healthz')).ok) return child
      } catch {
        // vx-bot/NOTE: Wait for this isolated fixture's loopback listener.
      }
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    throw new Error('Interactive companion did not start: ' + localLogs)
  }
  const beginConnection = () =>
    page.evaluate(() => {
      void window.connectLocal('http://127.0.0.1:4420/api/tamizhi')
    })
  let local = await startLocal()
  await beginConnection()
  await page.waitForFunction(
    () => document.querySelector('#verification').textContent.length === 6
  )
  let verification = await page.locator('#verification').textContent()
  await waitForVerification(verification)
  assert.ok(localLogs.includes('Connection request from http://127.0.0.1:4419'))
  assert.equal(
    (
      await fetch('http://127.0.0.1:4420/api/tamizhi/session', {
        headers: { Origin: 'http://127.0.0.1:4419' }
      })
    ).status,
    403
  )
  local.stdin.write('n\n')
  await page.waitForFunction(() => window.connectionError !== null)
  assert.match(await page.evaluate(() => window.connectionError), /rejected/)
  await beginConnection()
  await page.waitForFunction(
    previous =>
      document.querySelector('#verification').textContent.length === 6 &&
      document.querySelector('#verification').textContent !== previous,
    verification
  )
  verification = await page.locator('#verification').textContent()
  await waitForVerification(verification)
  local.stdin.write('y\n')
  await page.waitForFunction(() => window.connectionReady)
  assert.ok(
    (await page.evaluate(() => window.connectedModels)).some(
      model => model.id === 'leo/default'
    ),
    'Fresh companion must advertise Leo without BYOK'
  )
  assert.match(await page.evaluate(() => window.leoAnswer), /Leo/)
  const leoTerminal = await exec(binary, [
    'chat',
    '--data-dir',
    localDirectory,
    '--listen',
    '127.0.0.1:4420',
    '--permission',
    'safe',
    'hi'
  ])
  assert.match(leoTerminal.stdout, /Leo/)
  assert.deepEqual(
    JSON.parse(
      await readFile(path.join(localDirectory, 'allowed-origins.json'), 'utf8')
    ).origins,
    ['http://127.0.0.1:4419']
  )
  local.kill('SIGTERM')
  await new Promise(resolve => local.once('exit', resolve))
  localLogs = ''
  local = await startLocal()
  await page.reload()
  await page.waitForFunction(() => typeof window.connectLocal === 'function')
  await beginConnection()
  await page.waitForFunction(() => window.connectionReady)
  assert.equal(
    localLogs.includes('Connection request from'),
    false,
    'Saved origin must reconnect without prompting after restart'
  )
  local.kill('SIGTERM')
  await new Promise(resolve => local.once('exit', resolve))
  await new Promise(resolve => server.close(resolve))
  server = undefined
  await writeFile(
    path.join(temporary, 'app/index.html'),
    '<!doctype html><main id="answer"></main><div id="verification"></div><script src="/app.js"></script>'
  )
  // vx-bot/NOTE: Redirect only this test server's fixed target to the isolated Go fixture, never the user's daemon.
  const fixtureTarget = {
    name: 'fixture-target',
    configResolved(config) {
      config.server.proxy['^/__tamizhi/companion(?:/|$)'].target =
        'http://127.0.0.1:4418'
    }
  }
  devServer = await createViteServer({
    configFile: false,
    root: path.join(temporary, 'app'),
    logLevel: 'error',
    plugins: [companionDevProxy(), fixtureTarget],
    server: {
      host: '127.0.0.1',
      port: 4419,
      strictPort: true,
      allowedHosts: ['test.vezham.local']
    }
  })
  await devServer.listen()
  const discovery = await fetch(
    'http://127.0.0.1:4419/__tamizhi/companion-info',
    {
      headers: { Origin: 'http://evil.example' }
    }
  )
  assert.equal(
    discovery.status,
    403,
    'Cross-origin callers must not reach the relay'
  )
  const denied = await fetch(
    'http://127.0.0.1:4419/__tamizhi/companion/session',
    {
      headers: { Origin: 'http://evil.example' }
    }
  )
  assert.equal(denied.status, 403)
  const devPage = await browser.newPage()
  devPage.on('pageerror', error => errors.push(error.message))
  const requests = []
  devPage.on('request', request => requests.push(request.url()))
  await devPage.goto('http://test.vezham.local:4419')
  await devPage.waitForFunction(() => typeof window.research === 'function')
  assert.equal(await devPage.evaluate(() => window.isSecureContext), false)
  await devPage.evaluate(() =>
    window.research('http://127.0.0.1:7331/api/tamizhi')
  )
  assert.match(await devPage.locator('#answer').textContent(), /99.0.0/)
  await assertResearchTools(devPage)
  assert.ok(
    requests.some(url => url.includes('/__tamizhi/companion/session')),
    'Session GET must retain the paired app origin'
  )
  assert.equal(
    requests.some(
      url =>
        url.startsWith('http://127.0.0.1:7331') ||
        url.startsWith('http://127.0.0.1:4418')
    ),
    false,
    'Insecure app must use same-origin transport throughout'
  )
  await devPage.evaluate(() =>
    window.connectLocal('http://127.0.0.1:7331/api/tamizhi')
  )
  assert.equal(
    await devPage.evaluate(() => window.connectionReady),
    true,
    'New connection handshake must work through the insecure development relay'
  )
  assert.equal(
    await devPage.locator('#verification').textContent(),
    '',
    'Preapproved origins must not flash a terminal approval prompt'
  )
  for (const [command, isPreview] of [
    ['build', false],
    ['serve', true]
  ]) {
    const config = await resolveConfig(
      { configFile: false, logLevel: 'silent', plugins: [companionDevProxy()] },
      command,
      'production',
      'production',
      isPreview
    )
    assert.equal(
      config.plugins.some(
        plugin => plugin.name === 'vx-tamizhi-companion-dev-proxy'
      ),
      false,
      'No companion relay in build or preview'
    )
    assert.equal(config.server.proxy, undefined)
  }
  assert.deepEqual(errors, [])
  console.log(
    'PASS: approved companion connection → browser → TanStack → Go research → streamed answer/sources; insecure .vezham.local relay pairing/session/streaming; cross-origin rejection; no build/preview relay; CLI chat and connection replay rejection; real terminal reject/approve, saved trust, reconnect after restart; default Leo catalog, real browser/CLI replies, and Leo web-tool research without model keys.'
  )
} finally {
  for (const child of companions) {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill('SIGTERM')
      await new Promise(resolve => child.once('exit', resolve))
    }
  }
  await browser?.close()
  await devServer?.close()
  if (server) await new Promise(resolve => server.close(resolve))
  if (fixture && fixture.exitCode === null) {
    // vx-bot/NOTE: Signal the fixture child through its process group; it owns no user server.
    if (process.platform === 'win32') fixture.kill('SIGTERM')
    else process.kill(-fixture.pid, 'SIGTERM')
    await Promise.race([
      new Promise(resolve => fixture.once('exit', resolve)),
      new Promise(resolve => setTimeout(resolve, 5000))
    ])
  }
  await rm(temporary, { recursive: true, force: true })
}
