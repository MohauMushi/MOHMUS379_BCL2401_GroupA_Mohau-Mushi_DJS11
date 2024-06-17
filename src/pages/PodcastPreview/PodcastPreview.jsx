import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchShowDetails } from "../../api/api";
import { CircularProgress } from "@material-ui/core";
import "./PodcastPreview.css";
import { addFavorite} from "../../pages/FavoritesPage/Favorites";

const PodcastPreview = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [addedEpisode, setAddedEpisode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getShowDetails = async () => {
      setLoading(true);
      const data = await fetchShowDetails(id);
      setShow(data);
      setSelectedSeason(data.seasons[0]);
      setLoading(false);
    };
    getShowDetails();
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setAddedEpisode(null);
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  const addToFavorites = (episode) => {
    const updatedFavorites = [...favorites, episode];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setShowPopup(true);
    setAddedEpisode(episode);
  };

  if (loading) {
    return <CircularProgress className="circular-progress" />;
  }

  if (!show) {
    return <div className="not-found">Show not found</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Link onClick={handleBack} className="back-button">
        &larr; <span>Back</span>
      </Link>
        
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-button" onClick={closePopup}>&times;</span>
            <p>
              Episode {addedEpisode ? `${addedEpisode.title}` : ''} added to favorites!
            </p>
          </div>
        </div>
      )}
      <div className="show-details">
        <h2 className="show-title">{show.title}</h2>
        <div className="show-image-container">
          <img
            className="show-image"
            src={show.image}
            alt={show.title}
            title={show.title}
          />
        </div>
        <p className="show-description">{show.description}</p>
        <div className="season-selector">
          {show.seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => handleSeasonSelect(season)}
              className={`season-button ${
                selectedSeason?.id === season.id ? "active" : ""
              }`}
            >
              Season {season.season}
            </button>
          ))}
        </div>
        {selectedSeason && (
          <div className="episodes-list">
            {selectedSeason.episodes.map((episode) => (
              <div key={episode.id} className="episode-card">
                <div className="episode-info">
                  <div className="episode-number">
                    <span>Episode {episode.episode}</span>
                  </div>
                  <div className="episode-title">
                    <h2>{episode.title}</h2>
                  </div>
                  <div className="episode-description">
                    <h5>{episode.description}</h5>
                  </div>
                  <button className="add_to_favorites" onClick={() => addToFavorites(episode)} >
                    Add to Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PodcastPreview;