import { useEffect } from "react"
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai"
import { BiCrown } from "react-icons/bi"
import { BsStarFill, BsStarHalf } from "react-icons/bs"
import { RiLeafLine } from "react-icons/ri"
import { Footer } from "../components/Chrome"
import { useStore } from "../store"

const reviews = [
  ["Hanna M.", "This app has been a game-changer for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.", "game-changer"],
  ["David B.", "I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It's also very user-friendly and intuitive.", "concise and accurate summaries"],
  ["Nathan S.", "This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative. Definitely worth downloading.", "The summaries are well-written and informative."],
  ["Ryan R.", "If you're a busy person who loves reading but doesn't have the time to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.", "loves reading but doesn't have the time"],
]

function ReviewBody({ text, bold }) {
  const parts = text.split(bold)
  return (
    <div className="review__body">
      {parts[0]}
      <b>{bold}</b>
      {parts[1]}
    </div>
  )
}

export default function Home() {
  const openAuth = useStore((state) => state.openAuth)

  useEffect(() => {
    const onScroll = () => {
      const headings = [...document.querySelectorAll(".statistics__heading")]
      const mark = window.innerHeight * 0.55
      let active = 0
      headings.forEach((heading, index) => {
        if (heading.getBoundingClientRect().top < mark) active = index
      })
      headings.forEach((heading, index) => {
        heading.classList.toggle("statistics__heading--active", index === active)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="wrapper wrapper__full">
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img className="nav__img" src="/logo.png" alt="Summarist" />
          </figure>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={() => openAuth("login")}>
              Login
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" /> individuals who barely have time to read,
                  <br className="remove--tablet" /> and even people who don’t like to read.
                </div>
                <button className="btn home__cta--btn" onClick={() => openAuth("login")}>
                  Login
                </button>
              </div>
              <figure className="landing__image--mask">
                <img src="/landing.png" alt="landing" />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <div className="container">
          <div className="row">
            <div className="section__title">Understand books in few minutes</div>
            <div className="features__wrapper">
              <div className="features">
                <div className="features__icon">
                  <AiFillFileText />
                </div>
                <div className="features__title">Read or listen</div>
                <div className="features__sub--title">Save time by getting the core ideas from the best books.</div>
              </div>
              <div className="features">
                <div className="features__icon">
                  <AiFillBulb />
                </div>
                <div className="features__title">Find your next read</div>
                <div className="features__sub--title">Explore book lists and personalized recommendations.</div>
              </div>
              <div className="features">
                <div className="features__icon">
                  <AiFillAudio />
                </div>
                <div className="features__title">Briefcasts</div>
                <div className="features__sub--title">Gain valuable insights from briefcasts</div>
              </div>
            </div>
            <div className="statistics__wrapper">
              <div className="statistics__content--header">
                {["Enhance your knowledge", "Achieve greater success", "Improve your health", "Develop better parenting skills", "Increase happiness", "Be the best version of yourself!"].map((item) => (
                  <div className="statistics__heading" key={item}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="statistics__content--details">
                <div className="statistics__data">
                  <div className="statistics__data--number">93%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>significantly increase</b> reading frequency.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">96%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">90%</div>
                  <div className="statistics__data--title">
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>
            <div className="statistics__wrapper">
              <div className="statistics__content--details statistics__content--details-second">
                <div className="statistics__data">
                  <div className="statistics__data--number">91%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>report feeling more productive</b> after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">94%</div>
                  <div className="statistics__data--title">
                    of Summarist members have <b>noticed an improvement</b> in their overall comprehension and retention of information.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">88%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>feel more informed</b> about current events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div className="statistics__content--header statistics__content--header-second">
                {["Expand your learning", "Accomplish your goals", "Strengthen your vitality", "Become a better caregiver", "Improve your mood", "Maximize your abilities"].map((item) => (
                  <div className="statistics__heading" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              {reviews.map(([name, text, bold]) => (
                <div className="review" key={name}>
                  <div className="review__header">
                    <div className="review__name">{name}</div>
                    <div className="review__stars">
                      {Array.from({ length: 5 }, (_, index) => (
                        <BsStarFill key={index} />
                      ))}
                    </div>
                  </div>
                  <ReviewBody text={text} bold={bold} />
                </div>
              ))}
            </div>
            <div className="reviews__btn--wrapper">
              <button className="btn home__cta--btn" onClick={() => openAuth("login")}>
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="numbers">
        <div className="container">
          <div className="row">
            <div className="section__title">Start growing with Summarist now</div>
            <div className="numbers__wrapper">
              <div className="numbers">
                <div className="numbers__icon">
                  <BiCrown />
                </div>
                <div className="numbers__title">3 Million</div>
                <div className="numbers__sub--title">Downloads on all platforms</div>
              </div>
              <div className="numbers">
                <div className="numbers__icon numbers__star--icon">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className="numbers__title">4.5 Stars</div>
                <div className="numbers__sub--title">Average ratings on iOS and Google Play</div>
              </div>
              <div className="numbers">
                <div className="numbers__icon">
                  <RiLeafLine />
                </div>
                <div className="numbers__title">97%</div>
                <div className="numbers__sub--title">Of Summarist members create a better reading habit</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
