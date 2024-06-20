import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./SlidingCarousel.css";

const ShowCarousel = ({ shows }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (direction) => {
    if (direction === "next") {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % Math.ceil(shows.length / 3)
      );
    } else {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + Math.ceil(shows.length / 3)) %
          Math.ceil(shows.length / 3)
      );
    }
  };

  return (
    <>
      <div className="heading-container">
        <h1 className="greeting-heading">Welcome to PodStream 👋</h1>
      </div>

      <div className="show-carousel">
      <h2 className="recommend">Recommended for you...</h2>
        <div className="carousel-inner">
          {shows.slice(activeIndex * 3, activeIndex * 3 + 3).map((show) => (
            <div key={show.id} className="carousel-item">
              <div className="carousel-show-card">
                <img className="card-img" src={show.image} alt={show.title} />
                <div className="card-content">
                  <h3>{show.title}</h3>
                  <p>Seasons: {show.seasons}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control carousel-control-prev"
          onClick={() => handleSelect("prev")}
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-control carousel-control-next"
          onClick={() => handleSelect("next")}
        >
          <FaChevronRight />
        </button>
      </div>
    </>
  );
};

export default ShowCarousel;
