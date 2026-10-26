import { useEffect, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import {
  AiFillCheckCircle,
  AiFillHome,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineWarning,
} from "react-icons/ai"
import { BsBookmark } from "react-icons/bs"
import { FiHelpCircle, FiLogOut } from "react-icons/fi"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { RiQuillPenLine } from "react-icons/ri"
import { books } from "../books"
import { useStore } from "../store"

export function Notice() {
  const note = useStore((state) => state.note)
  const clearNote = useStore((state) => state.clearNote)
  if (!note) return null
  const iconClass =
    note.status === "error"
      ? "notification__status--icon-error"
      : note.status === "warning"
        ? "notification__status--icon-warning"
        : "notification__status--icon-succuss"
  const Icon = note.status === "success" ? AiFillCheckCircle : AiOutlineWarning
  return (
    <div className="notification__wrapper">
      <div className="notification__close" onClick={clearNote}>
        <AiOutlineClose />
      </div>
      <div className="notification">
        <div className="notification__status--icon">
          <Icon className={iconClass} />
        </div>
        <div className="notification__message">{note.message}</div>
      </div>
    </div>
  )
}

export function LoginGate({ text }) {
  const openAuth = useStore((state) => state.openAuth)
  return (
    <div className="settings__login--wrapper">
      <img src="/login.png" alt="" />
      <div className="settings__login--text">{text}</div>
      <button className="btn settings__login--btn" onClick={() => openAuth("login")}>
        Login
      </button>
    </div>
  )
}

function SideLink({ to, label, icon, locked }) {
  const setSidebarOpen = useStore((state) => state.setSidebarOpen)
  const inner = (active) => (
    <>
      <div className={`sidebar__link--line${active ? " active--tab" : ""}`} />
      <div className="sidebar__icon--wrapper">{icon}</div>
      <div className="sidebar__link--text">{label}</div>
    </>
  )
  if (locked) {
    return <div className="sidebar__link--wrapper sidebar__link--not-allowed">{inner(false)}</div>
  }
  return (
    <NavLink
      to={to}
      className="sidebar__link--wrapper"
      onClick={() => setSidebarOpen(false)}
    >
      {({ isActive }) => inner(isActive)}
    </NavLink>
  )
}

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)
  const openAuth = useStore((state) => state.openAuth)
  const sidebarOpen = useStore((state) => state.sidebarOpen)
  const setSidebarOpen = useStore((state) => state.setSidebarOpen)
  const fontSize = useStore((state) => state.fontSize)
  const setFontSize = useStore((state) => state.setFontSize)
  const onPlayer = location.pathname.startsWith("/player/")
  const sizes = [
    { size: 14, className: "sidebar__font--size-icon-small" },
    { size: 16, className: "sidebar__font--size-icon-medium" },
    { size: 20, className: "sidebar__font--size-icon-large" },
    { size: 24, className: "sidebar__font--size-icon-xlarge" },
  ]

  return (
    <>
      <div
        className={`sidebar__overlay${sidebarOpen ? "" : " sidebar__overlay--hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside className={`sidebar${sidebarOpen ? " sidebar--opened" : ""}`}>
        <div className="sidebar__logo">
          <Link to="/for-you">
            <img src="/logo.png" alt="Summarist" />
          </Link>
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <SideLink to="/for-you" label="For you" icon={<AiFillHome />} />
            <SideLink to="/library" label="My Library" icon={<BsBookmark />} />
            <SideLink label="Highlights" icon={<RiQuillPenLine />} locked />
            <SideLink label="Search" icon={<AiOutlineSearch />} locked />
            {onPlayer ? (
              <div className="sidebar__font--size-wrapper">
                {sizes.map((item) => (
                  <button
                    key={item.size}
                    className={`sidebar__font--size-icon ${item.className}${fontSize === item.size ? " sidebar__font--size-icon--active" : ""}`}
                    onClick={() => setFontSize(item.size)}
                  >
                    Aa
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="sidebar__bottom">
            <SideLink to="/settings" label="Settings" icon={<AiOutlineSetting />} />
            <SideLink label="Help & Support" icon={<FiHelpCircle />} locked />
            {user ? (
              <div
                className="sidebar__link--wrapper"
                onClick={() => {
                  logout()
                  navigate("/")
                }}
              >
                <div className="sidebar__link--line" />
                <div className="sidebar__icon--wrapper">
                  <FiLogOut />
                </div>
                <div className="sidebar__link--text">Logout</div>
              </div>
            ) : (
              <div className="sidebar__link--wrapper" onClick={() => openAuth("login")}>
                <div className="sidebar__link--line" />
                <div className="sidebar__icon--wrapper">
                  <AiOutlineUser />
                </div>
                <div className="sidebar__link--text">Login</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const setSidebarOpen = useStore((state) => state.setSidebarOpen)
  const matches = query.trim()
    ? books
        .filter((book) => `${book.title} ${book.author}`.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 8)
    : []

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <figure />
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                placeholder="Search for books"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <div className="search__icon">
                {query ? (
                  <AiOutlineClose className="search__delete--icon" onClick={() => setQuery("")} />
                ) : (
                  <AiOutlineSearch />
                )}
              </div>
            </div>
          </div>
          <button className="sidebar__toggle--btn" onClick={() => setSidebarOpen(true)}>
            <HiOutlineMenuAlt3 />
          </button>
        </div>
        {query ? (
          <div className="search__books--wrapper">
            {matches.length ? (
              matches.map((book) => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className="search__book--link"
                  onClick={() => setQuery("")}
                >
                  <figure className="search__book--img-mask">
                    <img className="search__book--img" src={book.imageLink} alt="" />
                  </figure>
                  <div>
                    <div className="search__book--title">{book.title}</div>
                    <div className="search__book--author">{book.author}</div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-search">No books found</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function AuthModal() {
  const authOpen = useStore((state) => state.authOpen)
  const authMode = useStore((state) => state.authMode)
  const closeAuth = useStore((state) => state.closeAuth)
  const setAuthMode = useStore((state) => state.setAuthMode)
  const register = useStore((state) => state.register)
  const login = useStore((state) => state.login)
  const google = useStore((state) => state.google)
  const guest = useStore((state) => state.guest)
  const resetPassword = useStore((state) => state.resetPassword)
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!authOpen) {
      setError("")
      setSuccess("")
      setPassword("")
    }
  }, [authOpen, authMode])

  if (!authOpen) return null

  const goNext = () => {
    if (location.pathname === "/" || location.pathname === "/choose-plan") navigate("/for-you")
  }

  const submit = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")
    if (!email.trim()) {
      setError("Please enter your email.")
      return
    }
    setBusy(true)
    if (authMode === "google") {
      const message = await google(email.trim())
      setBusy(false)
      if (message) setError(message)
      else goNext()
      return
    }
    if (!password) {
      setBusy(false)
      setError("Please enter your password.")
      return
    }
    if (authMode === "forgot") {
      const message = await resetPassword(email.trim(), password)
      setBusy(false)
      if (message) setError(message)
      else {
        setSuccess("Password updated. You can log in now.")
        setAuthMode("login")
        setPassword("")
      }
      return
    }
    const message = authMode === "signup" ? await register(email.trim(), password) : await login(email.trim(), password)
    setBusy(false)
    if (message) setError(message)
    else goNext()
  }

  const title =
    authMode === "signup" ? "Sign up to Summarist" : authMode === "forgot" ? "Reset your password" : authMode === "google" ? "Continue with Google" : "Log in to Summarist"

  return (
    <div className="auth__wrapper" onClick={closeAuth}>
      <div className="auth" onClick={(event) => event.stopPropagation()}>
        <div className="auth__close--btn" onClick={closeAuth}>
          <AiOutlineClose />
        </div>
        <div className="auth__content">
          <div className="auth__title">{title}</div>
          {error ? <div className="auth__error">{error}</div> : null}
          {success ? <div className="auth__success">{success}</div> : null}
          {authMode === "login" || authMode === "signup" ? (
            <>
              <button
                className="btn guest__btn--wrapper"
                onClick={() => {
                  guest()
                  goNext()
                }}
              >
                <div className="guest__icon--mask google__icon--mask">
                  <AiOutlineUser />
                </div>
                Login as a Guest
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
              <button className="btn google__btn--wrapper" onClick={() => setAuthMode("google")}>
                <div className="google__icon--mask">
                  <img src="/google.png" alt="" />
                </div>
                {authMode === "signup" ? "Sign up with Google" : "Login with Google"}
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
            </>
          ) : null}
          <form className="auth__main--form" onSubmit={submit}>
            <input
              className="auth__main--input"
              placeholder={authMode === "google" ? "Google email" : "Email Address"}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {authMode !== "google" ? (
              <div className="auth__field">
                <input
                  className="auth__main--input"
                  placeholder={authMode === "forgot" ? "New password" : "Password"}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button type="button" className="auth__eye" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            ) : null}
            <button className="auth__btn" disabled={busy}>
              {authMode === "signup" ? "Sign up" : authMode === "forgot" ? "Reset password" : authMode === "google" ? "Continue" : "Login"}
            </button>
          </form>
          {authMode === "login" ? (
            <div className="auth__forgot--password" onClick={() => setAuthMode("forgot")}>
              Forgot your password?
            </div>
          ) : null}
        </div>
        <button
          className="auth__switch--btn"
          onClick={() => setAuthMode(authMode === "signup" ? "login" : "signup")}
        >
          {authMode === "signup" ? "Already have an account?" : "Don't have an account?"}
        </button>
      </div>
    </div>
  )
}

export function Footer() {
  const columns = [
    ["Actions", ["Summarist Magazine", "Cancel Subscription", "Help", "Contact us"]],
    ["Useful Links", ["Pricing", "Summarist Business", "Gift Cards", "Authors & Publishers"]],
    ["Company", ["About", "Careers", "Partners", "Code of Conduct"]],
    ["Other", ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"]],
  ]
  return (
    <section id="footer">
      <div className="container">
        <div className="row">
          <div className="footer__top--wrapper">
            {columns.map(([title, links]) => (
              <div className="footer__block" key={title}>
                <div className="footer__link--title">{title}</div>
                <div>
                  {links.map((link) => (
                    <div className="footer__link--wrapper" key={link}>
                      <a className="footer__link">{link}</a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="footer__copyright--wrapper">
            <div className="footer__copyright">Copyright &copy; 2023 Summarist.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
