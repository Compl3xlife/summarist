import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AiFillStar, AiOutlineClockCircle, AiOutlineAudio } from "react-icons/ai"
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"
import { HiOutlineBookOpen, HiOutlineLightBulb } from "react-icons/hi"
import { useDuration } from "../components/BookCard"
import { LoginGate } from "../components/Chrome"
import { getBook } from "../books"
import { words } from "../format"
import { useStore } from "../store"

export default function BookPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = getBook(id)
  const user = useStore((state) => state.user)
  const library = useStore((state) => state.library)
  const openAuth = useStore((state) => state.openAuth)
  const toggleSaved = useStore((state) => state.toggleSaved)
  const notify = useStore((state) => state.notify)
  const duration = useDuration(book?.audioLink)
  const [loading, setLoading] = useState(true)
  const shelf = user ? library[user.email] || { saved: [], finished: [] } : { saved: [], finished: [] }
  const saved = book ? shelf.saved.includes(book.id) : false

  useEffect(() => {
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), 400)
    return () => window.clearTimeout(timer)
  }, [id])

  if (!user) return <LoginGate text="Log in to your account to read and listen to the book" />
  if (!book) return <div>Book not found</div>

  const openPlayer = () => {
    if (book.subscriptionRequired && !user.subscriptionPlan) {
      notify(`${book.title} is only available for premium users.`, "warning", 15000)
      navigate("/choose-plan")
      return
    }
    if (shelf.finished.includes(book.id)) notify("You have already finished this book.", "warning", 4000)
    else notify("You can read this book.", "success", 3000)
    navigate(`/player/${book.id}`)
  }

  const save = () => {
    const added = toggleSaved(book.id)
    notify(
      added ? "Book added to your library successfully." : "Book removed from your library successfully.",
      "success",
      15000
    )
  }

  if (loading) {
    return (
      <div className="inner__book--skeleton">
        <div className="inner__book--skeleton-content">
          <div className="skeleton" style={{ width: "60%", height: 32, marginBottom: 16 }} />
          <div className="skeleton" style={{ width: "40%", height: 18, marginBottom: 16 }} />
          <div className="skeleton" style={{ width: "80%", height: 80 }} />
        </div>
        <div className="skeleton" style={{ width: 180, height: 240 }} />
      </div>
    )
  }

  return (
    <div className="inner__wrapper">
      <div className="inner__book">
        <div className="inner-book__title">
          {book.title}
          {book.subscriptionRequired && !user.subscriptionPlan ? " (Premium)" : ""}
        </div>
        <div className="inner-book__author">{book.author}</div>
        <div className="inner-book__sub--title">{book.subTitle}</div>
        <div className="inner-book__wrapper">
          <div className="inner-book__description--wrapper">
            <div className="inner-book__description">
              <div className="inner-book__icon">
                <AiFillStar />
              </div>
              <div>
                {book.averageRating.toFixed(1)} ({book.totalRating} ratings)
              </div>
            </div>
            <div className="inner-book__description">
              <div className="inner-book__icon">
                <AiOutlineClockCircle />
              </div>
              <div>{words(duration)}</div>
            </div>
            <div className="inner-book__description">
              <div className="inner-book__icon">
                <AiOutlineAudio />
              </div>
              <div>{book.type}</div>
            </div>
            <div className="inner-book__description">
              <div className="inner-book__icon">
                <HiOutlineLightBulb />
              </div>
              <div>{book.keyIdeas} Key ideas</div>
            </div>
          </div>
        </div>
        <div className="inner-book__read--btn-wrapper">
          <button className="inner-book__read--btn" onClick={openPlayer}>
            <span className="inner-book__read--icon">
              <HiOutlineBookOpen />
            </span>
            Read
          </button>
          <button className="inner-book__read--btn" onClick={openPlayer}>
            <span className="inner-book__read--icon">
              <AiOutlineAudio />
            </span>
            Listen
          </button>
        </div>
        <button className="inner-book__bookmark" onClick={save}>
          <div className="inner-book__bookmark--icon">{saved ? <BsBookmarkFill /> : <BsBookmark />}</div>
          <div>{saved ? "Saved in My Library" : "Add title to My Library"}</div>
        </button>
        <div className="inner-book__secondary--title">What's it about?</div>
        <div className="inner-book__tags--wrapper">
          {book.tags.map((tag) => (
            <div className="inner-book__tag" key={tag}>
              {tag}
            </div>
          ))}
        </div>
        <div className="inner-book__book--description">{book.bookDescription}</div>
        <div className="inner-book__author--title">About the author</div>
        <div className="inner-book__author--description">{book.authorDescription}</div>
      </div>
      <div className="inner-book--img-wrapper">
        <img className="inner-book__img" src={book.imageLink} alt={book.title} />
      </div>
    </div>
  )
}
