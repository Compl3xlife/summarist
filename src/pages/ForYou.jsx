import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AiFillPlayCircle, AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { BookCard, BookSkeleton, useDuration } from "../components/BookCard"
import { LoginGate } from "../components/Chrome"
import { byStatus } from "../books"
import { words } from "../format"
import { useStore } from "../store"

function Row({ title, subtitle, books, loading }) {
  const scroller = useRef(null)
  return (
    <div>
      <div className="for-you__title">{title}</div>
      <div className="for-you__sub--title">{subtitle}</div>
      {loading ? (
        <div className="recommended__books--skeleton-wrapper">
          {Array.from({ length: 5 }, (_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="for-you__books">
          <button className="for-you__arrow for-you__arrow--left" onClick={() => scroller.current?.scrollBy({ left: -420, behavior: "smooth" })}>
            <AiOutlineLeft />
          </button>
          <div className="for-you__recommended--books" ref={scroller}>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <button className="for-you__arrow for-you__arrow--right" onClick={() => scroller.current?.scrollBy({ left: 420, behavior: "smooth" })}>
            <AiOutlineRight />
          </button>
        </div>
      )}
    </div>
  )
}

function Selected({ book }) {
  const duration = useDuration(book.audioLink)
  return (
    <Link to={`/book/${book.id}`} className="selected__book">
      <div className="selected__book--sub-title">{book.subTitle}</div>
      <div className="selected__book--content">
        <figure className="selected__img--mask">
          <img className="selected__img" src={book.imageLink} alt={book.title} />
        </figure>
        <div className="selected__book--text">
          <div className="selected__book--title">{book.title}</div>
          <div className="selected__book--author">{book.author}</div>
          <div className="selected__book--duration-wrapper">
            <div className="selected__book--icon">
              <AiFillPlayCircle />
            </div>
            <div className="selected__book--duration">{words(duration)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ForYou() {
  const user = useStore((state) => state.user)
  const [loading, setLoading] = useState(true)
  const selected = byStatus("selected")[0]

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500)
    return () => window.clearTimeout(timer)
  }, [])

  if (!user) return <LoginGate text="Log in to your account to see your books." />

  return (
    <div>
      <div className="for-you__title">Selected just for you</div>
      {loading || !selected ? <div className="selected__book--skeleton" /> : <Selected book={selected} />}
      <Row title="Recommended For You" subtitle="We think you’ll like these" books={byStatus("recommended")} loading={loading} />
      <Row title="Suggested Books" subtitle="Browse those books" books={byStatus("suggested")} loading={loading} />
    </div>
  )
}
