import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    navigate("/home");
  };

  return (
    <div className="auth-ombre">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="auth-subtext">
          Log in to continue reading stories you love
        </p>

        {/* EMAIL */}
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

        {/* PASSWORD */}
        <div className="auth-field">
          <label>Password</label>
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

        <button className="auth-btn" onClick={handleLogin}>
          Log in
        </button>

        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
