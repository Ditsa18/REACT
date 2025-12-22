import { useState } from "react";
import stories from "../data/stories";
import StoryCard from "../components/StoryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faHeart,
  faList,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("library");

  // TEMP reader data (replace later with backend)
  const user = {
    name: "Ditsa Bakshi",
    username: "@ditsa_reads",
    bio: "Romance & fantasy reader. Late-night binge reader 🌙📚",
    avatar: "https://i.pravatar.cc/150?img=47", // replace with uploaded image later
  };

  // TEMP data (simulate reader activity)
  const readingNow = stories.slice(0, 6);
  const savedStories = stories.slice(6, 12);

  return (
    <div className="profile-page">
      {/* HEADER */}
      <div className="profile-header">
        <img src={user.avatar} className="profile-avatar" />

        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="profile-username">{user.username}</p>
          <p className="profile-bio">{user.bio}</p>

          <button className="primary-btn">Edit Profile</button>
        </div>
      </div>

      {/* READER STATS */}
      <div className="profile-stats">
        <div>
          <FontAwesomeIcon icon={faBookOpen} />
          <span>128 Stories Read</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faHeart} />
          <span>2.1K Votes</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faList} />
          <span>5 Reading Lists</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faClock} />
          <span>Reading Streak: 12 days</span>
        </div>
      </div>

      {/* TABS */}
      <div className="profile-tabs">
        <button
          className={activeTab === "library" ? "active" : ""}
          onClick={() => setActiveTab("library")}
        >
          Library
        </button>
        <button
          className={activeTab === "lists" ? "active" : ""}
          onClick={() => setActiveTab("lists")}
        >
          Reading Lists
        </button>
        <button
          className={activeTab === "activity" ? "active" : ""}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
        <button
          className={activeTab === "about" ? "active" : ""}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === "library" && (
        <>
          <h3 className="profile-section-title">Currently Reading</h3>
          <div className="profile-grid">
            {readingNow.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          <h3 className="profile-section-title">Saved for Later</h3>
          <div className="profile-grid">
            {savedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </>
      )}

      {activeTab === "lists" && (
        <p className="empty-state">
          Your reading lists will appear here 📚
        </p>
      )}

      {activeTab === "activity" && (
        <div className="activity-feed">
          <p>❤️ You voted on <strong>Right Hook</strong></p>
          <p>📖 You started reading <strong>Neon Skies</strong></p>
          <p>🔖 You saved <strong>The Hollow House</strong></p>
        </div>
      )}

      {activeTab === "about" && (
        <div className="about-section">
          <p>
            Hi! I love discovering emotional stories, binge-reading series,
            and finding underrated gems. Always open to recommendations 💛
          </p>
        </div>
      )}
    </div>
  );
}
