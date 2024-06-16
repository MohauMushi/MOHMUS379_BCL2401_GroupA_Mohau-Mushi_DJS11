import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchShowDetails } from "../../api/api";
import { CircularProgress } from "@material-ui/core";
import "./PodcastPreview.css";

const PodcastPreview = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
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
                <h4 className="episode-title">{episode.title}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PodcastPreview;
