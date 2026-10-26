import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import { AuthModal, Notice, SearchBar, Sidebar } from "./components/Chrome"
import BookPage from "./pages/BookPage"
import ForYou from "./pages/ForYou"
import Home from "./pages/Home"
import LibraryPage from "./pages/LibraryPage"
import PlanPage from "./pages/PlanPage"
import PlayerPage from "./pages/PlayerPage"
import SettingsPage from "./pages/SettingsPage"

function Shell() {
  const location = useLocation()
  const player = location.pathname.startsWith("/player/")
  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <SearchBar />
        <div className={player ? "player-main" : "app-main"}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <>
      <Notice />
      <AuthModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose-plan" element={<PlanPage />} />
        <Route element={<Shell />}>
          <Route path="/for-you" element={<ForYou />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  )
}
