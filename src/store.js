import { create } from "zustand"
import { persist } from "zustand/middleware"
import { hashPassword } from "./format"

const emptyShelf = () => ({ saved: [], finished: [] })

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      library: {},
      authOpen: false,
      authMode: "login",
      note: null,
      fontSize: 16,
      sidebarOpen: false,
      openAuth: (authMode = "login") => set({ authOpen: true, authMode }),
      closeAuth: () => set({ authOpen: false }),
      setAuthMode: (authMode) => set({ authMode }),
      setFontSize: (fontSize) => set({ fontSize }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      notify: (message, status = "success", duration = 4000) => {
        window.clearTimeout(get().noteTimer)
        const noteTimer = window.setTimeout(() => set({ note: null }), duration)
        set({ note: { message, status }, noteTimer })
      },
      clearNote: () => set({ note: null }),
      shelf() {
        const email = get().user?.email
        if (!email) return emptyShelf()
        return get().library[email] || emptyShelf()
      },
      async register(email, password) {
        const users = get().users
        if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
          return "An account with that email already exists."
        }
        const user = {
          id: crypto.randomUUID(),
          email,
          password: await hashPassword(password),
          subscriptionPlan: null,
        }
        set({
          users: [...users, user],
          user: { id: user.id, email: user.email, subscriptionPlan: null },
          authOpen: false,
        })
        return ""
      },
      async login(email, password) {
        const found = get().users.find((user) => user.email.toLowerCase() === email.toLowerCase())
        if (!found || found.password !== (await hashPassword(password))) {
          return "Wrong email or password."
        }
        set({
          user: { id: found.id, email: found.email, subscriptionPlan: found.subscriptionPlan || null },
          authOpen: false,
        })
        return ""
      },
      async google(email) {
        const found = get().users.find((user) => user.email.toLowerCase() === email.toLowerCase())
        if (found) {
          set({
            user: { id: found.id, email: found.email, subscriptionPlan: found.subscriptionPlan || null },
            authOpen: false,
          })
          return ""
        }
        const user = {
          id: crypto.randomUUID(),
          email,
          password: "",
          provider: "google",
          subscriptionPlan: null,
        }
        set({
          users: [...get().users, user],
          user: { id: user.id, email: user.email, subscriptionPlan: null },
          authOpen: false,
        })
        return ""
      },
      guest() {
        set({
          user: { id: "guest", email: "guest@summarist.app", subscriptionPlan: null, guest: true },
          authOpen: false,
        })
      },
      logout() {
        set({ user: null, sidebarOpen: false })
      },
      async resetPassword(email, password) {
        const users = get().users
        const index = users.findIndex((user) => user.email.toLowerCase() === email.toLowerCase())
        if (index < 0) return "No account found for that email."
        const next = users.slice()
        next[index] = { ...next[index], password: await hashPassword(password) }
        set({ users: next })
        return ""
      },
      subscribe(plan) {
        const user = get().user
        if (!user) return
        set({
          user: { ...user, subscriptionPlan: plan },
          users: get().users.map((item) => (item.email === user.email ? { ...item, subscriptionPlan: plan } : item)),
        })
      },
      toggleSaved(id) {
        const user = get().user
        if (!user) return false
        const library = { ...get().library }
        const shelf = library[user.email] || emptyShelf()
        const exists = shelf.saved.includes(id)
        library[user.email] = {
          ...shelf,
          saved: exists ? shelf.saved.filter((item) => item !== id) : [...shelf.saved, id],
        }
        set({ library })
        return !exists
      },
      markFinished(id) {
        const user = get().user
        if (!user) return
        const library = { ...get().library }
        const shelf = library[user.email] || emptyShelf()
        if (shelf.finished.includes(id)) return
        library[user.email] = { ...shelf, finished: [...shelf.finished, id] }
        set({ library })
      },
    }),
    {
      name: "summarist",
      partialize: (state) => ({
        user: state.user,
        users: state.users,
        library: state.library,
        fontSize: state.fontSize,
      }),
    }
  )
)
