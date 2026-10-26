import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai"
import { MdForward10, MdReplay10 } from "react-icons/md"
import { LoginGate } from "../components/Chrome"
import { getBook } from "../books"
import { clock } from "../format"
import { useStore } from "../store"

export default function PlayerPage() {
  const { id } = useParams()
  const book = getBook(id)
  const user = useStore((state) => state.user)
  const fontSize = useStore((state) => state.fontSize)
  const markFinished = useStore((state) => state.markFinished)
  const notify = useStore((state) => state.notify)
  const audioRef = useRef(null)
  const barRef = useRef(null)
  const ended = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !book) return undefined
    ended.current = false
    const paint = () => {
      const current = audio.currentTime || 0
      const total = audio.duration || 0
      setTime(current)
      if (barRef.current && total) {
        barRef.current.style.setProperty("--range-progress", `${(current / total) * 100}%`)
      }
    }
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd = () => {
      setPlaying(false)
      if (!ended.current) {
        ended.current = true
        markFinished(book.id)
        notify("You have finished listening to this book!", "success", 5000)
      }
    }
    audio.addEventListener("timeupdate", paint)
    audio.addEventListener("loadedmetadata", onMeta)
    audio.addEventListener("ended", onEnd)
    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", paint)
      audio.removeEventListener("loadedmetadata", onMeta)
      audio.removeEventListener("ended", onEnd)
    }
  }, [book, id, markFinished, notify])

  if (!user) return <LoginGate text="Log in to your account to read and listen to the book" />
  if (!book) return <div className="app-main">Book not found</div>

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) audio.pause()
    else audio.play()
    setPlaying(!playing)
  }

  const skip = (amount) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min((audio.duration || 0), audio.currentTime + amount))
  }

  const seek = (value) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Number(value)
    setTime(Number(value))
  }

  return (
    <>
      <div className="summary">
        <div className="audio__book--summary" style={{ fontSize }}>
          <div className="audio__book--summary-title">{book.title}</div>
          <div className="audio__book--summary-text">{book.summary}</div>
        </div>
      </div>
      <div className="audio__wrapper">
        <div className="audio__track--wrapper">
          <figure className="audio__track--image-mask">
            <img className="audio__track--image" alt="" src={book.imageLink} />
          </figure>
          <div className="audio__track--details-wrapper">
            <div>{book.title}</div>
            <div className="audio__track--author">{book.author}</div>
          </div>
        </div>
        <div className="audio__controls">
          <button className="audio__controls--btn" onClick={() => skip(-10)}>
            <MdReplay10 />
          </button>
          <button className="audio__controls--btn audio__controls--btn-play" onClick={toggle}>
            {playing ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
          </button>
          <button className="audio__controls--btn" onClick={() => skip(10)}>
            <MdForward10 />
          </button>
        </div>
        <div className="audio__progress--wrapper">
          <div className="audio__time">{clock(time)}</div>
          <input
            ref={barRef}
            className="audio__progress--bar"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={time}
            onChange={(event) => seek(event.target.value)}
          />
          <div className="audio__time">{clock(duration)}</div>
        </div>
      </div>
      <audio ref={audioRef} src={book.audioLink} preload="metadata" />
    </>
  )
}
