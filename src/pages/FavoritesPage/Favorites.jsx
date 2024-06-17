import React, { useState, useEffect } from 'react';
import './Favorites.css';

const addFavorite = (favorites, episode) => {
  const timestamp = new Date().toISOString();
  return [...favorites, { ...episode, addedAt: timestamp }];
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

  const groupedFavorites = favorites.reduce((acc, fav) => {
    const key = `${fav.showTitle} - Season ${fav.season}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(fav);
    return acc;
  }, {});

  return (
    <div className="favorites">
      <h1>Favorite Episodes</h1>
      {favorites.length === 0 ? (
        <p className='no_favorite_episode'>No favorite episodes added yet.</p>
      ) : (
        <>
          {Object.keys(groupedFavorites).map((group, index) => (
            <div key={index} className="favorite-group">
              <h2>{group}</h2>
              <ul>
                {groupedFavorites[group].map((fav, index) => (
                  <li key={index} className="favorite-item">
                    <div className="favorite-details">
                      <h3>{fav.title}</h3>
                      <p>Episode {fav.episode}</p>
                      <p>{fav.description}</p>
                      <p>Added on: {new Date(fav.addedAt).toLocaleString()}</p>
                      <button onClick={() => removeFavorite(favorites.indexOf(fav))}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
