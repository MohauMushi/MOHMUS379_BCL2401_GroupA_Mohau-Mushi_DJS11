import { useState, useEffect } from "react";
import { fetchPodcasts } from "../../api/api";
import { CircularProgress } from "@material-ui/core";
import "./HomePage.css";

const HomePage = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState({});

  useEffect(() => {
    const getPodcasts = async () => {
      setLoading(true);
      const data = await fetchPodcasts();
      setShows(data);
      setLoading(false);
    };
    getPodcasts();
  }, []);

  const toggleDescription = (showId) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [showId]: !prevState[showId],
    }));
  };

  if (loading) {
    return <CircularProgress className="circular-progress"/>;
  }

  return (
    <div className="home-page">
      <div className="shows-list">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <img
              className="show-image"
              src={show.image}
              alt={show.title}
              title={show.title}
            />
            <div className="show-content">
              <h2 className="show-title">{show.title}</h2>
              <p className="show-description">
                {showFullDescription[show.id]
                  ? show.description
                  : `${show.description.slice(0, 100)}...`}
                <button
                  className="read-more-btn"
                  onClick={() => toggleDescription(show.id)}
                >
                  {showFullDescription[show.id] ? "Read Less" : "Read More"}
                </button>
              </p>
              <p className="show-seasons">Seasons: {show.seasons}</p>
              <p className="show-updated">
                Last Updated: {new Date(show.updated).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;