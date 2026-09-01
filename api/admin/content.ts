import { readContent, validateContent, writeContent } from "../_lib/content"
import { requireSession } from "../_lib/session"

export const config = { runtime: "edge" }

export default async function handler(request: Request) {
  if (!(await requireSession(request))) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  if (request.method === "GET") {
    const content = await readContent()
    return new Response(JSON.stringify(content), {
      status: 200,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    })
  }

  if (request.method === "POST") {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return new Response(JSON.stringify({ error: "invalid_body" }), { status: 400 })
    }

    const content = validateContent(body)
    if (!content) {
      return new Response(JSON.stringify({ error: "invalid_shape" }), { status: 422 })
    }

    try {
      await writeContent(content)
    } catch {
      return new Response(JSON.stringify({ error: "kv_unavailable" }), {
        status: 503,
        headers: { "content-type": "application/json" },
      })
    }

    return new Response(JSON.stringify(content), {
      status: 200,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    })
  }

  return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405 })
}
