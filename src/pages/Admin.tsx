import { useEffect, useState, type FormEvent } from "react"
import { DEFAULT_CONTENT, type SiteContent, type NewsEntry } from "@/data/content"

type Screen = "checking" | "login" | "loading" | "ready"

const inputClass =
  "w-full rounded-md border border-hairline bg-background px-3 py-2 text-sm outline-none focus:border-foreground"

export function Admin() {
  const [screen, setScreen] = useState<Screen>("checking")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data: { authenticated?: boolean }) => (data.authenticated ? loadContent() : setScreen("login")))
      .catch(() => setScreen("login"))
  }, [])

  async function loadContent() {
    setScreen("loading")
    const res = await fetch("/api/admin/content")
    if (res.ok) {
      setContent(await res.json())
      setScreen("ready")
    } else {
      setScreen("login")
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoginError(null)
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setPassword("")
      await loadContent()
    } else {
      setLoginError("Wrong password.")
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    setContent(DEFAULT_CONTENT)
    setScreen("login")
  }

  async function handleSave() {
    setSaving(true)
    setSaveMessage(null)
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(content),
    })
    if (res.ok) {
      setContent(await res.json())
      setSaveMessage("Saved — live on the site now.")
    } else {
      setSaveMessage("Save failed. Try again.")
    }
    setSaving(false)
  }

  function updateAbout(patch: Partial<SiteContent["about"]>) {
    setContent((c) => ({ ...c, about: { ...c.about, ...patch } }))
  }

  function updateEntry(id: string, patch: Partial<NewsEntry>) {
    setContent((c) => ({ ...c, news: c.news.map((e) => (e.id === id ? { ...e, ...patch } : e)) }))
  }

  function addEntry() {
    const id = `entry-${Date.now()}`
    setContent((c) => ({ ...c, news: [{ id, date: "", title: "", body: "" }, ...c.news] }))
  }

  function removeEntry(id: string) {
    setContent((c) => ({ ...c, news: c.news.filter((e) => e.id !== id) }))
  }

  if (screen === "checking" || screen === "loading") {
    return <p className="py-24 text-center text-sm text-muted-foreground">Loading…</p>
  }

  if (screen === "login") {
    return (
      <div className="mx-auto max-w-sm py-16">
        <h1 className="mb-6 text-display-sm">Admin</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-sm">
            Password
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </label>
          {loginError && <p className="text-sm text-destructive">{loginError}</p>}
          <button
            type="submit"
            className="rounded-[var(--radius-btn)] bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Log in
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-display-sm">Admin</h1>
        <div className="flex items-center gap-3">
          {saveMessage && <span className="text-sm text-muted-foreground">{saveMessage}</span>}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-hairline px-5 py-2 text-sm"
          >
            Log out
          </button>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-bold">About</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            Intro
            <textarea
              rows={3}
              value={content.about.intro}
              onChange={(e) => updateAbout({ intro: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            How we test
            <textarea
              rows={4}
              value={content.about.howWeTest}
              onChange={(e) => updateAbout({ howWeTest: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            Open source
            <textarea
              rows={3}
              value={content.about.openSource}
              onChange={(e) => updateAbout({ openSource: e.target.value })}
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">News</h2>
          <button
            type="button"
            onClick={addEntry}
            className="rounded-full border border-hairline px-4 py-1.5 text-sm"
          >
            + Add entry
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {content.news.map((entry) => (
            <div key={entry.id} className="rounded-[var(--radius-card)] border border-hairline bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <input
                  value={entry.date}
                  placeholder="Date"
                  onChange={(e) => updateEntry(entry.id, { date: e.target.value })}
                  className={`w-36 ${inputClass}`}
                />
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  className="ml-auto text-xs font-medium text-destructive"
                >
                  Remove
                </button>
              </div>
              <input
                value={entry.title}
                placeholder="Title"
                onChange={(e) => updateEntry(entry.id, { title: e.target.value })}
                className={`mb-2 font-bold ${inputClass}`}
              />
              <textarea
                value={entry.body}
                placeholder="Body"
                rows={4}
                onChange={(e) => updateEntry(entry.id, { body: e.target.value })}
                className={inputClass}
              />
            </div>
          ))}
          {content.news.length === 0 && (
            <p className="text-sm text-muted-foreground">No entries yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}
