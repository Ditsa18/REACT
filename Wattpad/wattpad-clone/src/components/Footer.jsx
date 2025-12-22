import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faBriefcase,
  faShieldAlt,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Wattpad Clone</p>

      <div className="footer-links">
        <span>
          <FontAwesomeIcon icon={faInfoCircle} /> About
        </span>
        <span>
          <FontAwesomeIcon icon={faBriefcase} /> Careers
        </span>
        <span>
          <FontAwesomeIcon icon={faShieldAlt} /> Privacy
        </span>
        <span>
          <FontAwesomeIcon icon={faFileContract} /> Terms
        </span>
      </div>

      <div className="footer-social">
        <FontAwesomeIcon icon={faGithub} />
        <FontAwesomeIcon icon={faLinkedin} />
      </div>
    </footer>
  );
}
