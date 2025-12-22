import { useLocation } from "react-router-dom";
import stories from "../data/stories";
import StoryCard from "../components/StoryCard";

export default function Search() {
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  const results = stories.filter(
  (story) =>
    story.title.toLowerCase().includes(query.toLowerCase()) ||
    story.author.toLowerCase().includes(query.toLowerCase()) ||
    story.genre.toLowerCase().includes(query.toLowerCase())
);


  return (
    <div className="search-page">
      <h2 className="search-title">
        Search results for "{query}"
      </h2>

      {results.length > 0 ? (
        <div className="search-grid">
          {results.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <p className="no-results">
          No stories found 😔
        </p>
      )}
    </div>
  );
}
