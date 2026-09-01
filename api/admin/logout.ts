import { sessionCookieHeader } from "../_lib/session"

export const config = { runtime: "edge" }

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405 })
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": sessionCookieHeader(null),
    },
  })
}
