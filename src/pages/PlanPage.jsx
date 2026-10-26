import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiOutlineClockCircle, AiOutlineDown, AiOutlineStar } from "react-icons/ai"
import { HiOutlineUserGroup } from "react-icons/hi"
import { Footer } from "../components/Chrome"
import { useStore } from "../store"

const faqs = [
  {
    id: 1,
    title: "How does the free 7-day trial work?",
    text: "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
  },
  {
    id: 2,
    title: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    text: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
  },
  {
    id: 3,
    title: "What's included in the Premium plan?",
    text: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books, high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
  },
  {
    id: 4,
    title: "Can I cancel during my trial or subscription?",
    text: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
  },
]

export default function PlanPage() {
  const [plan, setPlan] = useState("premium-plus")
  const [open, setOpen] = useState(1)
  const user = useStore((state) => state.user)
  const openAuth = useStore((state) => state.openAuth)
  const subscribe = useStore((state) => state.subscribe)
  const notify = useStore((state) => state.notify)
  const navigate = useNavigate()

  const start = () => {
    if (!user) {
      openAuth("login")
      return
    }
    subscribe(plan)
    notify(plan === "premium-plus" ? "Premium Plus is now active." : "Premium Monthly is now active.", "success", 4000)
    navigate("/settings")
  }

  return (
    <div className="wrapper wrapper__full">
      <section className="plan">
        <div className="plan__header--wrapper">
          <div className="plan__header">
            <div className="plan__title">Get unlimited access to many amazing books to read</div>
            <div className="plan__sub--title">Turn ordinary moments into amazing learning opportunities</div>
            <figure className="plan__img--mask">
              <img src="/pricing-top.png" alt="" />
            </figure>
          </div>
        </div>
        <div className="row">
          <div className="plan__features--wrapper">
            <div>
              <div className="plan__features--icon">
                <AiOutlineClockCircle />
              </div>
              <div className="plan__features--text">
                <b>Key ideas in few min</b>
                <br />
                with many books to read
              </div>
            </div>
            <div>
              <div className="plan__features--icon">
                <HiOutlineUserGroup />
              </div>
              <div className="plan__features--text">
                <b>3 million</b>
                <br />
                people growing with Summarist everyday
              </div>
            </div>
            <div>
              <div className="plan__features--icon">
                <AiOutlineStar />
              </div>
              <div className="plan__features--text">
                <b>Precise recommendations</b>
                <br />
                collections curated by experts
              </div>
            </div>
          </div>
          <div className="section__title">Choose the plan that fits you</div>
          <div className={`plan__card${plan === "premium-plus" ? " plan__card--active" : ""}`} onClick={() => setPlan("premium-plus")}>
            <div className="plan__card--circle">{plan === "premium-plus" ? <div className="plan__card--dot" /> : null}</div>
            <div>
              <div className="plan__card--title">Premium Plus Yearly</div>
              <div className="plan__card--price">$99.99/year</div>
              <div className="plan__card--text">7-day free trial included</div>
            </div>
          </div>
          <div className="plan__card--separator">or</div>
          <div className={`plan__card${plan === "premium" ? " plan__card--active" : ""}`} onClick={() => setPlan("premium")}>
            <div className="plan__card--circle">{plan === "premium" ? <div className="plan__card--dot" /> : null}</div>
            <div>
              <div className="plan__card--title">Premium Monthly</div>
              <div className="plan__card--price">$9.99/month</div>
              <div className="plan__card--text">No trial included</div>
            </div>
          </div>
          <div className="plan__card--cta">
            <button className="btn" onClick={start}>
              {plan === "premium-plus" ? "Start your free 7-day trial" : "Start your first month"}
            </button>
            <div className="plan__disclaimer">
              {plan === "premium-plus"
                ? "Cancel your trial at any time before it ends, and you won’t be charged."
                : "30-day money back guarantee, no questions asked."}
            </div>
          </div>
          <div>
            {faqs.map((item) => {
              const shown = open === item.id
              return (
                <div className="accordion__card" key={item.id}>
                  <div className="accordion__header" onClick={() => setOpen(shown ? 0 : item.id)}>
                    <div className="accordion__title">{item.title}</div>
                    <AiOutlineDown className={`accordion__icon${shown ? " accordion__icon--rotate" : ""}`} />
                  </div>
                  {shown ? <div className="accordion__body">{item.text}</div> : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
