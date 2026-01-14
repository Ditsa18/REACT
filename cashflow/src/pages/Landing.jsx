import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'
import illustration from '../assets/landing-illustration.jpg'
import AuthModal from '../components/auth/AuthModal'

function Landing() {
  const [authMode, setAuthMode] = useState(null) // 'login' | 'signup'
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // 🔐 Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="landing-wrapper">
      {/* background shapes */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />

      {/* navbar */}
      <header className="landing-nav">
        <div className="nav-left">
          <img src={logo} alt="CashFlow logo" />
          <span>CashFlow</span>
        </div>

        {/* LOGIN */}
        <button
          className="nav-login"
          onClick={() => setAuthMode('login')}
        >
          Login
        </button>
      </header>

      {/* hero */}
      <section className="landing-hero-card">
        <div className="hero-text">
          <h1>
            Control your cash <br />
            flow with clarity.
          </h1>

          <p>
            Track income, expenses, and insights — all in one clean,
            distraction-free dashboard.
          </p>

          {/* GET STARTED */}
          <button
            className="hero-button"
            onClick={() => setAuthMode('signup')}
          >
            Get Started →
          </button>
        </div>

        <div className="hero-visual">
          <img
            src={illustration}
            alt="CashFlow illustration"
          />
        </div>
      </section>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
        />
      )}
    </div>
  )
}

export default Landing