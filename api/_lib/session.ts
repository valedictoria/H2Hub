// Session handling for the /api/admin/* routes. There's a single admin
// (one password, ADMIN_PASSWORD env var) and no user table, so a signed,
// stateless cookie is enough — no session store needed. The signing key
// is the password itself: rotating the password invalidates every
// existing session too, which is the behavior you want.
//
// Uses Web Crypto (crypto.subtle) rather than Node's `crypto` module so
// this works unchanged on both the Edge and Node runtimes.

const SESSION_COOKIE = "h2chess_admin"
const SESSION_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function hmacHex(key: string, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(message))
  return toHex(sig)
}

// Fixed-length (post-hash) comparison so a wrong guess of any length
// takes the same time to reject as a near-miss.
export async function timingSafeStringsEqual(a: string, b: string, key: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([hmacHex(key, a), hmacHex(key, b)])
  if (ha.length !== hb.length) return false
  let diff = 0
  for (let i = 0; i < ha.length; i++) diff |= ha.charCodeAt(i) ^ hb.charCodeAt(i)
  return diff === 0
}

export async function createSessionToken(secret: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS
  const sig = await hmacHex(secret, `session:${expiresAt}`)
  return `${expiresAt}.${sig}`
}

export async function verifySessionToken(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false
  const [expiresAtStr, sig] = token.split(".")
  const expiresAt = Number(expiresAtStr)
  if (!expiresAtStr || !sig || Number.isNaN(expiresAt) || expiresAt < Date.now()) return false
  const expected = await hmacHex(secret, `session:${expiresAt}`)
  return expected === sig
}

export function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie")
  if (!header) return undefined
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=")
    if (key === name) return decodeURIComponent(rest.join("="))
  }
  return undefined
}

export function sessionCookieHeader(token: string | null): string {
  if (token === null) {
    return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`
  }
  const maxAgeSeconds = Math.floor(SESSION_TTL_MS / 1000)
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; Secure; SameSite=Strict`
}

export function getSessionTokenFromRequest(request: Request): string | undefined {
  return readCookie(request, SESSION_COOKIE)
}

export async function requireSession(request: Request): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) return false
  const token = getSessionTokenFromRequest(request)
  return verifySessionToken(token, secret)
}
