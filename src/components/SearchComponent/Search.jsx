import { useState } from "react";
import Fuse from "fuse.js";
import "./Search.css";
import searchLogo from "../../assets/search.png";

// eslint-disable-next-line react/prop-types
export default function Search({ podcastShows, setSearchResults }) {
  const [query, setQuery] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
    if (!showSearchBox) {
      setQuery("");
    }
  };

  const handleSearch = (query) => {
    const fuse = new Fuse(podcastShows, {
      keys: ["title"],
    });

    const results = query
      ? fuse.search(query).map((result) => result.item)
      : podcastShows;
    setSearchResults(results);
  };

  return (
    <div className="search-container">
      <img
        src={searchLogo}
        alt="Search"
        className="search-logo"
        onClick={toggleSearchBox}
      />
      {showSearchBox && (
        <form className="filter-search">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder="Search..."
            autoFocus
          />
        </form>
      )}
    </div>
  );
}