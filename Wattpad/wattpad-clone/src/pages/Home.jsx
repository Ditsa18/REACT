import { useRef, useState, useEffect } from "react";
import stories from "../data/stories";
import StoryCard from "../components/StoryCard";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="home-page">
        <HeroBanner />

        <Section
          title="Trending now"
          stories={stories.slice(0, 8)}
        />

        <Section
          title="Reading Radar"
          stories={stories.slice(8, 14)}
        />

        <Section
          title="Continue Reading"
          stories={stories.slice(3, 9)}
        />

        <Section
          title="Top Picks for You"
          stories={stories.slice(14, 20)}
        />
      </div>

      <Footer />
    </>
  );
}

/* ---------------- SECTION COMPONENT ---------------- */

function Section({ title, stories }) {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateButtons = () => {
    const el = rowRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 5
    );
  };

  const scrollRow = (direction) => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: direction === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateButtons();
  }, []);

  return (
    <section className="home-section">
      <h2>{title}</h2>

      <div className="row-wrapper">
        {showLeft && (
          <button
            className="scroll-btn left"
            onClick={() => scrollRow("left")}
            aria-label="Scroll left"
          >
            ❮
          </button>
        )}

        <div
          className="story-row"
          ref={rowRef}
          onScroll={updateButtons}
        >
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {showRight && (
          <button
            className="scroll-btn right"
            onClick={() => scrollRow("right")}
            aria-label="Scroll right"
          >
            ❯
          </button>
        )}
      </div>
    </section>
  );
}
