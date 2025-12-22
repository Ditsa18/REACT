import { useParams } from "react-router-dom";
import { useState } from "react";
import stories from "../data/stories";
import StoryCard from "../components/StoryCard";

export default function Genre() {
  const { genreName } = useParams();
  const [sortBy, setSortBy] = useState("trending");

  // Filter stories by genre
  const genreStories = stories.filter(
    (story) => story.genre === genreName
  );

  // Sort stories
  const sortedStories = [...genreStories].sort((a, b) => {
    if (sortBy === "popular") return b.reads - a.reads;
    if (sortBy === "new")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return b.rating - a.rating; // trending
  });

  return (
    <div className="genre-page">
      {/* GENRE BANNER */}
      <div className={`genre-banner genre-${genreName}`}>
        <h1>{genreName.toUpperCase()}</h1>
        <p>
          Discover the best {genreName} stories loved by readers
          around the world.
        </p>
      </div>

      {/* SORT BAR */}
      <div className="genre-sort">
        <button
          className={sortBy === "trending" ? "active" : ""}
          onClick={() => setSortBy("trending")}
        >
          Trending
        </button>

        <button
          className={sortBy === "popular" ? "active" : ""}
          onClick={() => setSortBy("popular")}
        >
          Popular
        </button>

        <button
          className={sortBy === "new" ? "active" : ""}
          onClick={() => setSortBy("new")}
        >
          New
        </button>
      </div>

      {/* STORY GRID */}
      {sortedStories.length > 0 ? (
        <div className="genre-grid">
          {sortedStories.map((story) => (
            <div key={story.id} className="genre-card">
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-genre">
          No stories found in this genre yet.
        </p>
      )}
    </div>
  );
}
