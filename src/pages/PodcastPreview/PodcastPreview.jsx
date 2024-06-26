import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchShowDetails } from "../../api/api";
import {
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./PodcastPreview.css";
import { addFavorite } from "../../pages/FavoritesPage/Favorites";
import { FaRegHeart, FaHeart, FaPlay } from "react-icons/fa";
import { useAudioPlayer } from "../../components/AudioPlayer/AudioPlayerContext";

const PodcastPreview = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [addedEpisode, setAddedEpisode] = useState(null);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const navigate = useNavigate();
  const { openPlayer } = useAudioPlayer();

  useEffect(() => {
    const getShowDetails = async () => {
      setLoading(true);
      const data = await fetchShowDetails(id);
      setShow(data);
      setSelectedSeason(data.seasons[-1]);
      setLoading(false);
    };
    getShowDetails();
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setAddedEpisode(null);
  };

  const handleSeasonSelect = (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);
    setShowEpisodes(true);
  };

  const addToFavorites = (episode) => {
    const episodeWithShowInfo = {
      ...episode,
      showTitle: show.title,
      season: selectedSeason.season,
    };
    const updatedFavorites = addFavorite(favorites, episodeWithShowInfo);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setShowPopup(true);
    setAddedEpisode(episodeWithShowInfo);
  };

  const handleHeartClick = (episode) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.title === episode.title
    );
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.title !== episode.title
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      addToFavorites(episode);
    }
  };

  const handleEpisodePlay = (episodeFile) => {
    openPlayer(episodeFile);
  };

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
            <span className="close-button" onClick={closePopup}>
              &times;
            </span>
            <p>
              Episode {addedEpisode ? `${addedEpisode.title}` : ""} added to
              favorites!
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <CircularProgress className="circular-progress" />
      ) : !show ? (
        <div className="not-found-episode">Show not found</div>
      ) : (
        <div className="show-details-episode">
          <h2 className="show-title-episode">{show.title}</h2>
          <div className="show-image-container">
            <img
              className="show-image-episode"
              src={show.image}
              alt={show.title}
              title={show.title}
            />
          </div>
          <p className="show-description-episode">{show.description}</p>
          <FormControl fullWidth size="medium" className="form_control">
            <InputLabel id="season-select-label">Season</InputLabel>
            <Select
              labelId="season-select-label"
              value={selectedSeason || ""}
              onChange={handleSeasonSelect}
              label="Season"
            >
              {show.seasons.map((season) => (
                <MenuItem key={season.season} value={season}>
                  Season {season.season}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {showEpisodes && selectedSeason && (
            <div className="episodes-list">
              {selectedSeason.episodes.map((episode) => (
                <div key={episode.episode} className="episode-card">
                  <div className="episode-info">
                    <div className="episode-number">
                      <span>Episode {episode.episode}</span>
                    </div>
                    <div className="episode-img">
                      <img
                        src={selectedSeason.image}
                        alt={`Season ${selectedSeason.season}`}
                      />
                    </div>
                    <div className="episode-title">
                      <h2>{episode.title}</h2>
                    </div>
                    <div className="episode-description">
                      <h5>{episode.description}</h5>
                    </div>
                    <div className="episode_audio_favorites">
                      <div className="audio_player">
                        <button
                          onClick={() => handleEpisodePlay(episode.file)}
                          className="play-button"
                        >
                          <FaPlay className="music-player" />
                        </button>
                      </div>
                      <div
                        className="add_to_favorites"
                        onClick={() => handleHeartClick(episode)}
                      >
                        {favorites.some(
                          (favorite) => favorite.title === episode.title
                        ) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PodcastPreview;
