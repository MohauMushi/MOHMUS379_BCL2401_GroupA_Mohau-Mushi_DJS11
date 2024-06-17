import React, { useState, useEffect } from 'react';
import './Favorites.css';

const addFavorite = (favorites, episode) => {
  return [...favorites, episode];
};

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (episodeId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== episodeId);
    setFavorites(updatedFavorites);  
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const resetFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite episodes yet.</p>
      ) : (
        <>
          <ul>
            {favorites.map((fav) => (
              <li key={fav.id} className="favorite-item">
                <div className="favorite-details">
                  <h3>{fav.title}</h3>
                  <p>Episode {fav.episode}</p>
                  <button onClick={() => removeFavorite(fav.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={resetFavorites}>Reset Favorites</button>
        </>
      )}
    </div>
  );
};

export default Favorites;
export { addFavorite };