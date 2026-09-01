import { Route, Routes } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { Home } from "@/pages/Home"
import { News } from "@/pages/News"
import { About } from "@/pages/About"
import { Admin } from "@/pages/Admin"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        {/* Unlisted in nav on purpose — password-gated, not meant to be browsed to. */}
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

export default App
