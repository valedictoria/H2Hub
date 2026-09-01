// Lets the admin page ask "am I already logged in?" on load without
// submitting a password — just checks the signed cookie.
import { requireSession } from "../_lib/session"

export const config = { runtime: "edge" }

export default async function handler(request: Request) {
  const authenticated = await requireSession(request)
  return new Response(JSON.stringify({ authenticated }), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  })
}
