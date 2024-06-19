import { useState, useEffect } from "react";
import { fetchPodcasts } from "../../api/api";
import { CircularProgress } from "@material-ui/core";
import "./HomePage.css";
import { mapGenres } from "../../utils/helperFunctions";
import { NavLink, useSearchParams } from "react-router-dom";
import GenreFilter from "../FilterSong/FilterSongsDropdown";
import Search from "../SearchComponent/Search";
import SongFilter from "../SortFilterComponent/SortFilter";

const HomePage = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const getPodcasts = async () => {
      setLoading(true);
      const data = await fetchPodcasts();
      setShows(data);
      setLoading(false);
    };
    getPodcasts();
  }, []);

  const genreFilter = searchParams.get("genre");

  if (loading) {
    return <CircularProgress className="circular-progress" />;
  }

  // const displayedSongs = genreFilter
  //   ? shows.filter((show) => show.genres.includes(parseInt(genreFilter)))
  //   : shows;


  // const handleFilterChange = (value) => {
  //   setFilter(value);
  // }

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  }

  const filteredShows = shows.filter((show) => {
    return(
      (!genreFilter || show.genres.includes(parseInt(genreFilter))) &&
      show.title.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const sortedShows = filteredShows.sort((a, b) => {
    if (sortOrder === "recent") {
      return new Date(b.updated) - new Date(a.updated);
    } else if(sortOrder === "least-recent"){
      return new Date(a.updated) - new Date(b.updated);
    } else if(sortOrder === "a-z"){
      return a.title.localeCompare(b.title);
    } else if(sortOrder === "z-a"){
      return b.title.localeCompare(a.title);
    }
    return 0;
  })

  const renderShows = (showsToRender) => {
    return showsToRender.map((show) => (
      <NavLink key={show.id} to={`/show/${show.id}`} className="preview-card-link">
        <div className="show-card">
          <img className="show-image" src={show.image} alt={show.title} title={show.title} />
          <div className="show-content">
            <h2 className="show-title">{show.title}</h2>
            <p className="show-line"></p>
            <p className="show-seasons">Seasons: {show.seasons}</p>
            <p className="show-updated">
              Last Updated: {new Date(show.updated).toLocaleDateString()}
            </p>
            <p className="show-genres">{mapGenres(show.genres)}</p>
          </div>
        </div>
      </NavLink>
    ));
  };
  
  

  return (
    <>
    <div className="home_container">
      <div className="home_top">
        <GenreFilter />
        <Search podcastShows={shows} setSearchResults={setSearchResults} />
        <SongFilter onSortOrderChange={handleSortOrderChange} />
      </div>

      <div className="home-page">
          {searchResults.length > 0 ? renderShows(searchResults) : renderShows(sortedShows)}
      </div>
      </div>
    </>
  );
};

export default HomePage;