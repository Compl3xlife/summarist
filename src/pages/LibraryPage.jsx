import { useEffect, useState } from "react"
import { BookCard, BookSkeleton } from "../components/BookCard"
import { LoginGate } from "../components/Chrome"
import { getBook } from "../books"
import { useStore } from "../store"

function countLabel(list) {
  return `${list.length} ${list.length === 1 ? "item" : "items"}`
}

function Section({ title, emptyTitle, emptyText, ids, loading }) {
  const items = ids.map((id) => getBook(id)).filter(Boolean)
  return (
    <div>
      <div className="for-you__title">{title}</div>
      {loading ? (
        <>
          <div className="for-you__sub--title">
            <div className="skeleton" style={{ width: 100, height: 20 }} />
          </div>
          <div className="recommended__books--skeleton-wrapper">
            {Array.from({ length: 5 }, (_, index) => (
              <BookSkeleton key={index} />
            ))}
          </div>
        </>
      ) : items.length ? (
        <>
          <div className="for-you__sub--title">{countLabel(items)}</div>
          <div className="for-you__recommended--books">
            {items.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="for-you__sub--title">0 items</div>
          <div className="finished__books--block-wrapper">
            <div className="finished__books--title">{emptyTitle}</div>
            <div className="finished__books--sub-title">{emptyText}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default function LibraryPage() {
  const user = useStore((state) => state.user)
  const library = useStore((state) => state.library)
  const [loading, setLoading] = useState(true)
  const shelf = user ? library[user.email] || { saved: [], finished: [] } : { saved: [], finished: [] }

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 400)
    return () => window.clearTimeout(timer)
  }, [])

  if (!user) return <LoginGate text="Log in to your account to see your library." />

  return (
    <div>
      <Section
        title="Saved Books"
        emptyTitle="Save your favorite books!"
        emptyText="When you save a book, it will appear here."
        ids={shelf.saved}
        loading={loading}
      />
      <Section
        title="Finished"
        emptyTitle="Done and dusted!"
        emptyText="When you finish a book, you can find it here later."
        ids={shelf.finished}
        loading={loading}
      />
    </div>
  )
}
