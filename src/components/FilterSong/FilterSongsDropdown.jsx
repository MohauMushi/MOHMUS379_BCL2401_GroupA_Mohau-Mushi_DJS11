import { useSearchParams } from "react-router-dom";
import "./GenreFilter.css";

const GenreFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (event) => {
    const genre = event.target.value;
    setSearchParams({ genre: genre });
  };

  return (
    <div className="genre-filter-dropdown">
      <select onChange={handleFilterChange} className="genre-select">
        <option value="" className="genre-option">All Genres</option>
        <option value="1" className="genre-option">Personal Growth</option>
        <option value="2" className="genre-option">Investigative Journalism</option>
        <option value="3" className="genre-option">History</option>
        <option value="4" className="genre-option">Comedy</option>
        <option value="5" className="genre-option">Entertainment</option>
        <option value="6" className="genre-option">Business</option>
        <option value="7" className="genre-option">Fiction</option>
        <option value="8" className="genre-option">News</option>
        <option value="9" className="genre-option">Kids and Family</option>
      </select>
    </div>
  );
};

export default GenreFilter;
