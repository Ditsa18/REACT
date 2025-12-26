import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AuthModal({ onClose, mode }) {
  const isSignup = mode === 'signup'

  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth()

  function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString()
  }

  function sendOtp() {
    if (isSignup && !name.trim()) {
      alert('Enter your name')
      return
    }

    if (phone.length !== 10) {
      alert('Enter valid 10-digit phone number')
      return
    }

    const otpCode = generateOtp()
    setGeneratedOtp(otpCode)
    setOtp('')
    setStep(2)

    alert(`Your CashFlow OTP is: ${otpCode}`)
  }

  function verifyOtp() {
    if (otp.length !== 4) {
      alert('Enter 4-digit OTP')
      return
    }

    if (otp === generatedOtp) {
      login({ name: isSignup ? name : undefined, phone })
      navigate('/app/dashboard')
    } else {
      alert('Invalid OTP. Please try again.')
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="auth-modal">
        {/* CLOSE BUTTON */}
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3>
              {isSignup ? 'Welcome to CashFlow' : 'Welcome back'}
            </h3>

            {isSignup && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            )}

            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              placeholder="Phone number"
              value={phone}
              onChange={e =>
                setPhone(e.target.value.replace(/\D/g, ''))
              }
            />

            <button
              className="auth-primary-btn"
              onClick={sendOtp}
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3>Verify OTP</h3>

            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={e =>
                setOtp(e.target.value.replace(/\D/g, ''))
              }
              className="otp-input"
            />

            <button
              className="auth-primary-btn"
              onClick={verifyOtp}
            >
              Verify & Continue
            </button>

            <p className="resend-otp" onClick={sendOtp}>
              Resend OTP
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthModal
