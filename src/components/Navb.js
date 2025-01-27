import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.scss";

const Nav = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">AyMusic</h1>
      <ul className="sidebar-menu">
        <li>
          <Link to="/" className="nav-link">
            🏠 Home
          </Link>
        </li>
        <li>
          <Link to="/explore" className="nav-link">
            🔍 Explore
          </Link>
        </li>
        <li>
          <Link to="/library" className="nav-link">
            📚 Library
          </Link>
        </li>
      </ul>
      <div className="new-playlist">
        <button className="new-playlist-button">+ New Playlist</button>
      </div>
    </div>
  );
};

export default Nav;
