import stories from "../data/stories";
import StoryCard from "../components/StoryCard";

export default function Explore() {
  return (
    <div className="page">
      <h1>Explore Stories</h1>
      <div className="story-grid">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
