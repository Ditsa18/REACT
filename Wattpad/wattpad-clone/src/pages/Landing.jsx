import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import hero from "../assets/hero.jpg";

export default function Landing() {
  return (
    <div className="landing">
      {/* LEFT */}
      <div className="landing-left">
        <img src={logo} className="landing-logo" alt="logo" />

        <h1>
          Come for the story.
          <br />
          Stay for the connection.
        </h1>

        <p>
          Stories better than streaming and comment sections better
          than your group chat.
        </p>

        {/* ACTION BUTTONS */}
        <div className="landing-actions">
          <Link to="/signup" className="primary-btn">
            Get started
          </Link>

          <Link to="/login" className="secondary-btn">
            Already have an account? Log in
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="landing-right"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay"></div>
      </div>
    </div>
  );
}
