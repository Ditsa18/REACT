import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faKey,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");

  // STEP 1: Generate OTP
  const handleGenerateOtp = () => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    setStep(2);

    alert(`Your OTP is: ${otpCode}`); // dev only
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  // STEP 3: Complete Signup
  const handleSignup = () => {
    if (!password) {
      alert("Please set a password");
      return;
    }

    login(email);
    navigate("/home");
  };

  return (
    <div className="auth-ombre">
      <div className="auth-card">
        <h2>Create an account</h2>
        <p className="auth-subtext">
          Join to discover and write amazing stories
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="auth-field">
              <label>Name</label>
              <div className="input-icon">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Email</label>
              <div className="input-icon">
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button className="auth-btn" onClick={handleGenerateOtp}>
              Generate OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="auth-field">
              <label>Enter OTP</label>
              <div className="input-icon">
                <FontAwesomeIcon icon={faKey} />
                <input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>

            <button className="auth-btn" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="auth-field">
              <label>Create Password</label>
              <div className="input-icon">
                <FontAwesomeIcon icon={faLock} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button className="auth-btn" onClick={handleSignup}>
              Create account
            </button>
          </>
        )}

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
