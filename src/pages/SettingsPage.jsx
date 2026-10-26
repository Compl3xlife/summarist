import { Link } from "react-router-dom"
import { LoginGate } from "../components/Chrome"
import { useStore } from "../store"

export default function SettingsPage() {
  const user = useStore((state) => state.user)
  if (!user) return <LoginGate text="Log in to your account to see your details." />
  return (
    <div>
      <div className="section__title page__title">Settings</div>
      <div className="setting__content">
        <div className="settings__sub--title">Your Subscription plan</div>
        <div className="settings__text">{user.subscriptionPlan || "Basic"}</div>
        {!user.subscriptionPlan ? (
          <Link className="btn settings__upgrade--btn" to="/choose-plan">
            Upgrade to Premium
          </Link>
        ) : null}
      </div>
      <div className="setting__content">
        <div className="settings__sub--title">Email</div>
        <div className="settings__text">{user.email}</div>
      </div>
    </div>
  )
}
