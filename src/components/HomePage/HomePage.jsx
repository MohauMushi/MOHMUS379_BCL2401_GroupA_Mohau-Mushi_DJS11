import { useState, useEffect } from "react";
import { fetchPodcasts } from "../../api/api";
import { CircularProgress } from "@material-ui/core";
import "./HomePage.css";
import { mapGenres } from "../../utils/helperFunctions";
import { useSearchParams } from "react-router-dom";
import GenreFilter from "../FilterSong/FilterSongsDropdown";
import Search from "../SearchComponent/Search";

const HomePage = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);

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

  const displayedSongs = genreFilter
    ? shows.filter((show) => show.genres.includes(parseInt(genreFilter)))
    : shows;

  return (
  <>
    <div className="">
    <GenreFilter />
    </div>
    

    <div className="home-page">
        <div className="shows-list">
          {searchResults.length > 0
            ? searchResults.map((show) => (
                <div key={show.id} className="show-card">
                  <img
                    className="show-image"
                    src={show.image}
                    alt={show.title}
                    title={show.title}
                  />
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
              ))
            : displayedSongs.map((show) => (
                <div key={show.id} className="show-card">
                  <img
                    className="show-image"
                    src={show.image}
                    alt={show.title}
                    title={show.title}
                  />
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
              ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;