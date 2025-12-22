import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMoon,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import stories from "../data/stories";

export default function ReaderLayout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const story = stories.find(s => s.id === Number(id));

  return (
    <div className="reader">
      <div className="reader-toolbar">
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
        <FontAwesomeIcon icon={faFont} />
        <FontAwesomeIcon icon={faMoon} />
      </div>

      <h1>{story.title}</h1>
      <p className="reader-text">{story.content}</p>
    </div>
  );
}
