import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart,
  faBookmark,
  faShare,
  faEye,
  faStar,
  faClock,
  faList,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import stories from "../data/stories";
import StoryCard from "../components/StoryCard";

export default function Story() {
  const { id } = useParams();
  const story = stories.find((s) => s.id === Number(id));

  if (!story) {
    return <p style={{ padding: "40px" }}>Story not found.</p>;
  }

  /* 🔢 Derived values */
  const parts = story.parts || Math.max(10, Math.floor(story.reads / 50000));
  const readingTime = `${Math.max(2, Math.floor(parts / 6))} hr`;
  const votes = Math.floor(story.reads / 8);
  const comments = Math.floor(story.reads / 20);

  const relatedStories = stories
    .filter((s) => s.genre === story.genre && s.id !== story.id)
    .slice(0, 6);

  return (
    <>
      {/* ================= BLUR HERO ================= */}
      <div
        className="story-hero-blur"
        style={{
          backgroundImage: `url(${story.cover})`,
        }}
      />

      {/* ================= STORY DETAIL ================= */}
      <div className="story-detail">
        {/* COVER */}
        <div className="story-cover-wrap">
          <img
            src={story.cover}
            alt={story.title}
            className="story-detail-cover"
          />

          <span className="story-status">
            {story.status || "Ongoing"}
          </span>
        </div>

        {/* MAIN INFO */}
        <div className="story-detail-info">
          <h1>{story.title}</h1>

          <p className="story-author">
            by <strong>{story.author}</strong>
          </p>

          {/* ACTIONS */}
          <div className="story-actions">
            <Link to={`/read/${id}`} className="primary-btn">
              <FontAwesomeIcon icon={faPlay} /> Start Reading
            </Link>

            <button className="icon-btn">
              <FontAwesomeIcon icon={faHeart} />
            </button>

            <button className="icon-btn">
              <FontAwesomeIcon icon={faBookmark} />
            </button>

            <button className="icon-btn">
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>

          {/* META */}
          <div className="story-meta">
            <span>
              <FontAwesomeIcon icon={faEye} /> {story.reads.toLocaleString()}
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} /> {story.rating}
            </span>
            <span>
              <FontAwesomeIcon icon={faClock} /> {readingTime}
            </span>
            <span>
              <FontAwesomeIcon icon={faList} /> {parts} Parts
            </span>
            <span>
              <FontAwesomeIcon icon={faHeart} /> {votes.toLocaleString()}
            </span>
            <span>
              <FontAwesomeIcon icon={faCommentDots} /> {comments.toLocaleString()}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="story-description">
            A captivating <strong>{story.genre}</strong> story that has captured
            the hearts of thousands of readers. Dive into a world crafted by{" "}
            <strong>{story.author}</strong> and experience every emotion, twist,
            and moment along the way.
          </p>

          {/* CHAPTER PREVIEW */}
          <div className="chapter-preview">
            <h3>Chapters</h3>
            <ul>
              {Array.from({ length: Math.min(5, parts) }).map((_, i) => (
                <li key={i}>
                  Chapter {i + 1}
                </li>
              ))}
            </ul>
            <span className="view-all">View all chapters</span>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="story-sidebar">
          <div className="sidebar-item">
            <strong>Status</strong>
            <span>{story.status || "Ongoing"}</span>
          </div>

          <div className="sidebar-item">
            <strong>Genre</strong>
            <span>{story.genre}</span>
          </div>

          <div className="sidebar-item">
            <strong>Reads</strong>
            <span>{story.reads.toLocaleString()}</span>
          </div>

          <div className="sidebar-item">
            <strong>Votes</strong>
            <span>{votes.toLocaleString()}</span>
          </div>

          <div className="sidebar-item">
            <strong>Parts</strong>
            <span>{parts}</span>
          </div>
        </aside>
      </div>

      {/* ================= FLOATING CTA ================= */}
      <Link to={`/read/${id}`} className="floating-read-btn">
        <FontAwesomeIcon icon={faPlay} /> Read
      </Link>

      {/* ================= RELATED ================= */}
      {relatedStories.length > 0 && (
        <section className="content-section">
          <h2>More like this</h2>

          <div className="story-row">
            {relatedStories.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
