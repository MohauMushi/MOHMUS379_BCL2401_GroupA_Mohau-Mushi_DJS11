import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShowDetails } from "../../api/api";
import { CircularProgress } from "@material-ui/core";
import "./PodcastPreview.css";

const PodcastPreview = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShowDetails = async () => {
      setLoading(true);
      const data = await fetchShowDetails(id);
      setShow(data);
      setLoading(false);
    };
    getShowDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress className="circular-progress" />;
  }

  if (!show) {
    return <div className="not-found">Show not found</div>;
  }

  return (
    <div className="show-details">
      <h2 className="show-title">{show.title}</h2>
      <p className="show-description">{show.description}</p>
      {show.seasons.map((season) => (
        <div key={season.id} className="season-container">
          <div className="season-details">
            <img
              className="season-image"
              src={season.image}
              alt={season.title}
              title={season.title}
            />
            <div className="season-info">
              <h3 className="season-title">{season.title}</h3>
              <p className="season-episodes">Episodes: {season.episodes.length}</p>
            </div>
          </div>
          <div className="episodes-list">
            {season.episodes.map((episode) => (
              <div key={episode.id} className="episode-card">
                <h4 className="episode-title">{episode.title}</h4>
        
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PodcastPreview;