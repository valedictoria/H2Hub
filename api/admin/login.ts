import { createSessionToken, sessionCookieHeader, timingSafeStringsEqual } from "../_lib/session"

export const config = { runtime: "edge" }

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405 })
  }

  const secret = process.env.ADMIN_PASSWORD
  if (!secret) {
    return new Response(JSON.stringify({ error: "admin_not_configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }

  let password: unknown
  try {
    const body = await request.json()
    password = (body as { password?: unknown }).password
  } catch {
    return new Response(JSON.stringify({ error: "invalid_body" }), { status: 400 })
  }

  if (typeof password !== "string" || !(await timingSafeStringsEqual(password, secret, secret))) {
    return new Response(JSON.stringify({ error: "invalid_password" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const token = await createSessionToken(secret)
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": sessionCookieHeader(token),
    },
  })
}
