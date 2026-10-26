import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai"
import { cachedDuration, rememberDuration } from "../books"
import { clock } from "../format"
import { useStore } from "../store"

export function useDuration(src) {
  const [value, setValue] = useState(cachedDuration(src))
  useEffect(() => {
    if (!src) return undefined
    if (cachedDuration(src)) {
      setValue(cachedDuration(src))
      return undefined
    }
    const audio = new Audio()
    audio.preload = "metadata"
    const ready = () => {
      rememberDuration(src, audio.duration)
      setValue(audio.duration)
    }
    audio.addEventListener("loadedmetadata", ready)
    audio.src = src
    return () => {
      audio.removeEventListener("loadedmetadata", ready)
      audio.src = ""
    }
  }, [src])
  return value
}

export function BookCard({ book }) {
  const duration = useDuration(book.audioLink)
  const user = useStore((state) => state.user)
  const premium = book.subscriptionRequired && !user?.subscriptionPlan
  return (
    <Link to={`/book/${book.id}`} className="for-you__recommended--books-link">
      {premium ? <div className="book__pill book__pill--subscription-required">Premium</div> : null}
      <div className="recommended__book--img-mask">
        <img className="recommended__book--img" src={book.imageLink} alt={book.title} />
      </div>
      <div className="recommended__book--title">{book.title}</div>
      <div className="recommended__book--author">{book.author}</div>
      <div className="recommended__book--sub-title">{book.subTitle}</div>
      <div className="recommended__book--details-wrapper">
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <AiOutlineClockCircle />
          </div>
          <div>{clock(duration)}</div>
        </div>
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <AiFillStar />
          </div>
          <div>{book.averageRating}</div>
        </div>
      </div>
    </Link>
  )
}

export function BookSkeleton() {
  return (
    <div className="recommended__books--skeleton">
      <div className="skeleton" style={{ width: "100%", height: 180, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: "80%", height: 16, marginBottom: 8 }} />
      <div className="skeleton" style={{ width: "50%", height: 14 }} />
    </div>
  )
}
