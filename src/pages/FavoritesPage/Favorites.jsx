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

  const removeFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const resetFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  return (
    <div className="favorites">
      <h1>Favorite Episodes</h1>
      {favorites.length === 0 ? (
        <p className='no_favorite_episode'>No favorite episodes added yet.</p>
      ) : (
        <>
          <ul>
            {favorites.map((fav, index) => (
              <li key={index} className="favorite-item">
              
                <div className="favorite-details">
                  <h3>{fav.title}</h3>
                  <p>Episode {fav.episode}</p>
                  <p>{fav.description}</p>
                  <button onClick={() => removeFavorite(index)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={resetFavorites} className="reset_button">
            Reset Favorites
          </button>
        </>
      )}
    </div>
  );
};

export default Favorites;
export { addFavorite };