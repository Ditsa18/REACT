import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenNib,
  faBell,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import stories from "../data/stories";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const [showGenres, setShowGenres] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  /*  LIVE SEARCH */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timeout = setTimeout(() => {
      const filtered = stories.filter(
        (story) =>
          story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults(filtered.slice(0, 6));
      setShowResults(true);
    }, 250);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  /* ⌨ ENTER SEARCH */
  const handleSearchKey = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  /* ❌ CLICK OUTSIDE */
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowGenres(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <img
          src={logo}
          className="nav-logo"
          alt="logo"
          onClick={() => navigate("/home")}
        />

        <Link to="/home">Home</Link>

        {/* EXPLORE */}
        <div className="nav-explore" ref={dropdownRef}>
          <span
            className="explore-btn"
            onClick={() => setShowGenres((prev) => !prev)}
          >
            Explore <FontAwesomeIcon icon={faChevronDown} />
          </span>

          {showGenres && (
            <div className="explore-dropdown">
              <Link to="/genre/romance">Romance</Link>
              <Link to="/genre/fantasy">Fantasy</Link>
              <Link to="/genre/sci-fi">Sci-Fi</Link>
              <Link to="/genre/mystery">Mystery</Link>
              <Link to="/genre/horror">Horror</Link>
              <Link to="/genre/drama">Drama</Link>
              <Link to="/genre/humor">Humor</Link>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className="nav-search" ref={searchRef}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          placeholder="Search stories, writers, genres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKey}
          onFocus={() => searchQuery && setShowResults(true)}
        />

        {showResults && results.length > 0 && (
          <div className="search-dropdown">
            {results.map((story) => (
              <div
                key={story.id}
                className="search-item"
                onClick={() => {
                  navigate(`/story/${story.id}`);
                  setShowResults(false);
                }}
              >
                <img src={story.cover} alt={story.title} />
                <div>
                  <p>{story.title}</p>
                  <span>{story.author}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <button className="nav-write">
          <FontAwesomeIcon icon={faPenNib} /> Write
        </button>

        <FontAwesomeIcon icon={faBell} className="nav-icon" />

        <div
          className="nav-profile"
          onClick={() => navigate("/profile")}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </nav>
  );
}
