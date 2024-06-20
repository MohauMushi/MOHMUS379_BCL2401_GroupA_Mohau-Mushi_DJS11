import React, { useState } from 'react';
import "./SlidingCarousel.css";

const ShowCarousel = ({ shows }) => {

  return (
    <div className="show-carousel">
    <h1 className='greeting-heading'>Welcome to PodStream</h1>
      <div className="carousel-inner">
        {shows.map((show) => (
          <div key={show.id} className="carousel-item">
            <div className="show-card">
              <img className="card-img" src={show.image} alt={show.title} />
              <div className="card-content">
                <h3>{show.title}</h3>
                <p>Season: {show.seasons}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default ShowCarousel;