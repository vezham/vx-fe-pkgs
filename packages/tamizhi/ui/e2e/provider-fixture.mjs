import { createHash, generateKeyPairSync, randomUUID, sign } from 'node:crypto'
import { createServer } from 'node:http'

const origin = 'http://127.0.0.1:4397'
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048
})
const publicJWK = {
  ...publicKey.export({ format: 'jwk' }),
  kid: 'browser',
  alg: 'RS256',
  use: 'sig'
}
const codes = new Map()
const metrics = {
  googleRequests: 0,
  googleRevocations: 0,
  transcriptions: 0,
  speech: 0,
  imageRequests: 0,
  audioBytes: 0
}
const json = (response, body, status = 200) => {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(body))
}
const wav = () => {
  const samples = 4000
  const buffer = Buffer.alloc(44 + samples * 2)
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(buffer.length - 8, 4)
  buffer.write('WAVEfmt ', 8)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(1, 22)
  buffer.writeUInt32LE(16000, 24)
  buffer.writeUInt32LE(32000, 28)
  buffer.writeUInt16LE(2, 32)
  buffer.writeUInt16LE(16, 34)
  buffer.write('data', 36)
  buffer.writeUInt32LE(samples * 2, 40)
  return buffer
}
createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', origin)
  const chunks = []
  for await (const chunk of request) chunks.push(chunk)
  const raw = Buffer.concat(chunks)
  if (url.pathname === '/healthz') return json(response, { ok: true })
  if (url.pathname === '/metrics') return json(response, metrics)
  if (url.pathname === '/.well-known/openid-configuration')
    return json(response, {
      issuer: origin,
      authorization_endpoint: `${origin}/authorize`,
      token_endpoint: `${origin}/token`,
      jwks_uri: `${origin}/keys`,
      id_token_signing_alg_values_supported: ['RS256']
    })
  if (url.pathname === '/keys') return json(response, { keys: [publicJWK] })
  if (url.pathname === '/authorize') {
    const code = randomUUID()
    codes.set(code, {
      google: url.searchParams.get('client_id') === 'google-browser-fixture',
      nonce: url.searchParams.get('nonce'),
      challenge: url.searchParams.get('code_challenge')
    })
    const callback = new URL(url.searchParams.get('redirect_uri'))
    if (callback.origin !== 'http://127.0.0.1:4398')
      return json(response, { error: 'invalid callback' }, 400)
    callback.searchParams.set('code', code)
    callback.searchParams.set('state', url.searchParams.get('state'))
    response.writeHead(302, { Location: callback.toString() })
    return response.end()
  }
  if (url.pathname === '/token') {
    const form = new URLSearchParams(raw.toString())
    const record = codes.get(form.get('code'))
    codes.delete(form.get('code'))
    if (
      !record ||
      createHash('sha256')
        .update(form.get('code_verifier') ?? '')
        .digest('base64url') !== record.challenge
    )
      return json(response, { error: 'invalid_grant' }, 400)
    if (record.google) {
      if (form.get('client_secret') !== 'browser-google-secret')
        return json(response, { error: 'invalid_client' }, 401)
      return json(response, {
        access_token: 'browser-google-access',
        refresh_token: 'browser-google-refresh',
        token_type: 'Bearer',
        expires_in: 3600
      })
    }
    const header = Buffer.from(
      JSON.stringify({ alg: 'RS256', kid: 'browser' })
    ).toString('base64url')
    const payload = Buffer.from(
      JSON.stringify({
        iss: origin,
        sub: 'browser-user',
        aud: 'browser-fixture',
        nonce: record.nonce,
        name: 'Browser User',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
      })
    ).toString('base64url')
    const unsigned = `${header}.${payload}`
    const signature = sign(
      'RSA-SHA256',
      Buffer.from(unsigned),
      privateKey
    ).toString('base64url')
    return json(response, {
      access_token: 'browser-fixture-access',
      token_type: 'Bearer',
      expires_in: 3600,
      id_token: `${unsigned}.${signature}`
    })
  }
  if (url.pathname === '/revoke') {
    metrics.googleRevocations++
    return json(response, {})
  }
  if (url.pathname.startsWith('/v1beta/')) {
    if (
      request.headers.authorization !== 'Bearer browser-google-access' ||
      request.headers['x-goog-user-project'] !== 'browser-project' ||
      request.headers['x-goog-api-key']
    )
      return json(response, { error: 'wrong Google authorization' }, 401)
    if (url.pathname === '/v1beta/models')
      return json(response, {
        models: [
          {
            name: 'models/gemini-browser',
            displayName: 'Gemini account model',
            supportedGenerationMethods: ['generateContent']
          }
        ]
      })
    if (
      url.pathname === '/v1beta/models/gemini-browser:streamGenerateContent'
    ) {
      metrics.googleRequests++
      response.writeHead(200, { 'Content-Type': 'text/event-stream' })
      response.write(
        `data: ${JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { role: 'model', parts: [{ text: 'Google account reply.' }] } }], usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 2, totalTokenCount: 5 } })}\n\n`
      )
      return response.end()
    }
  }
  if (request.headers.authorization !== 'Bearer browser-fixture-key')
    return json(response, { error: 'invalid fixture key' }, 401)
  if (url.pathname === '/v1/models')
    return json(response, {
      data: [{ id: 'gpt-4o-browser' }, { id: 'whisper-1' }, { id: 'tts-1' }]
    })
  if (url.pathname === '/v1/audio/transcriptions') {
    metrics.transcriptions++
    metrics.audioBytes = raw.length
    return json(response, { text: 'Dictated in browser' })
  }
  if (url.pathname === '/v1/audio/speech') {
    metrics.speech++
    response.writeHead(200, { 'Content-Type': 'audio/wav' })
    return response.end(wav())
  }
  if (url.pathname === '/v1/chat/completions') {
    const input = JSON.parse(raw.toString())
    if (
      input.messages.some(
        message =>
          Array.isArray(message.content) &&
          message.content.some(part => part.type === 'image_url')
      )
    )
      metrics.imageRequests++
    response.writeHead(200, { 'Content-Type': 'text/event-stream' })
    for (const text of ['Browser ', 'verified ', 'reply.']) {
      if (response.destroyed) return
      response.write(
        `data: ${JSON.stringify({ id: 'browser', choices: [{ index: 0, delta: { content: text } }] })}\n\n`
      )
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    return response.end(
      'data: {"id":"browser","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n'
    )
  }
  json(response, { error: 'not found' }, 404)
}).listen(4397, '127.0.0.1')
