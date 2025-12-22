import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faStar,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function StoryCard({ story }) {
  return (
    <Link to={`/story/${story.id}`} className="story-card">
      <img src={story.cover} alt={story.title} />

      <div className="story-info">
        <h4 className="story-title">{story.title}</h4>
        <p className="story-author">{story.author}</p>

        <div className="story-stats">
          <span><FontAwesomeIcon icon={faEye} /> {story.reads}</span>
          <span><FontAwesomeIcon icon={faStar} /> {story.rating}</span>
          <span><FontAwesomeIcon icon={faComment} /> {story.comments || 320}</span>
        </div>
      </div>
    </Link>
  );
}
