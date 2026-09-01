// Public read endpoint — serves whatever's currently in KV (falling back
// to the baked-in defaults), so News/About render admin-edited copy
// without a rebuild.
import { readContent } from "./_lib/content"

export const config = { runtime: "edge" }

export default async function handler() {
  const content = await readContent()
  return new Response(JSON.stringify(content), {
    status: 200,
    headers: {
      "content-type": "application/json",
      // Short cache: edits should show up quickly, but a page shouldn't
      // hit KV on every single load either.
      "cache-control": "public, s-maxage=15, stale-while-revalidate=120",
    },
  })
}
