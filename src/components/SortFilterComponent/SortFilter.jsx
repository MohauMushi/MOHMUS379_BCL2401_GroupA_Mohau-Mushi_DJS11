import { useState } from "react";
import "./SortFilter.css";

// eslint-disable-next-line react/prop-types
const SongFilter = ({ onFilterChange, onSortOrderChange }) => {
//   const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

//   const handleFilterChange = (e) => {
//     const value = e.target.value;
//     setFilter(value);
//     onFilterChange(value);
//   };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
    onSortOrderChange(value);
  };

  return (
    <div className="filter-container">
      <div className="filter-options">
        {/* <input
          type="text"
          placeholder="Search by title"
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        /> */}
        <div className="sort-buttons">
          <button
            className={`sort-button ${sortOrder === "recent" ? "active" : ""}`}
            onClick={() => handleSortOrderChange("recent")}
          >
            Most Recent
          </button>
          <button
            className={`sort-button ${sortOrder === "least-recent" ? "active" : ""}`}
            onClick={() => handleSortOrderChange("least-recent")}
          >
            Least Recent
          </button>
          <button
            className={`sort-button ${sortOrder === "a-z" ? "active" : ""}`}
            onClick={() => handleSortOrderChange("a-z")}
          >
            A-Z
          </button>
          <button
            className={`sort-button ${sortOrder === "z-a" ? "active" : ""}`}
            onClick={() => handleSortOrderChange("z-a")}
          >
            Z-A
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongFilter;