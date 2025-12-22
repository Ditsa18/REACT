import heroBanner from "../assets/hero-banner.jpg";

export default function HeroBanner() {
  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(${heroBanner})`
      }}
    >
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>The Accardis are back</h1>
        <p>More secrets. More power. Zero self-control.</p>
        <button className="hero-btn">Read for free</button>
      </div>
    </div>
  );
}
