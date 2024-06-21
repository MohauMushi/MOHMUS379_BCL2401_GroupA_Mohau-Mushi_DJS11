import React, { useState, useEffect } from 'react';
import './Favorites.css';
import { CircularProgress, Backdrop } from '@mui/material';

const addFavorite = (favorites, episode) => {
  const timestamp = new Date().toISOString();
  return [...favorites, { ...episode, addedAt: timestamp }];
};

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [filterText, setFilterText] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isNewDataLoading, setIsNewDataLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsInitialLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (index) => {
    setIsNewDataLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    } finally {
      setIsNewDataLoading(false);
    }
  };

  const resetFavorites = async () => {
    setIsNewDataLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setFavorites([]);
      localStorage.removeItem('favorites');
    } catch (error) {
      console.error('Error resetting favorites:', error);
    } finally {
      setIsNewDataLoading(false);
    }
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.addedAt) - new Date(a.addedAt);
    } else if (sortOrder === 'least-recent') {
      return new Date(a.addedAt) - new Date(b.addedAt);
    } else if (sortOrder === 'a-z') {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'z-a') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const filteredFavorites = sortedFavorites.filter((fav) =>
    fav.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const groupedFavorites = filteredFavorites.reduce((acc, fav) => {
    const key = `${fav.showTitle} - Season ${fav.season}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(fav);
    return acc;
  }, {});

  if (isInitialLoading) {
    return (
      <div className="favorites-loading">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="favorites">
      <h1>Favorite Episodes</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by title"
          value={filterText}
          onChange={handleFilterChange}
          className='favorites-input'
        />
        <select value={sortOrder} className='favorites-select' onChange={(e) => handleSortOrderChange(e.target.value)}>
          <option value="">Sort by...</option>
          <option value="recent">Most recently added</option>
          <option value="least-recent">Least recently added</option>
          <option value="a-z">Title (A-Z)</option>
          <option value="z-a">Title (Z-A)</option>
        </select>
      </div>
      {filteredFavorites.length === 0 ? (
        <p className="no_favorite_episode">No favorite episodes added yet.</p>
      ) : (
        <>
          {Object.keys(groupedFavorites).map((group, index) => (
            <div key={index} className="favorite-group">
              <h2>{group}</h2>
              <div className="favorite-flex-container">
                {groupedFavorites[group].map((fav, index) => (
                  <div key={index} className="favorite-item">
                    <div className="favorite-details">
                      <h3>{fav.title}</h3>
                      <p>Episode {fav.episode}</p>
                      <p>{fav.description}</p>
                      <p>Added on: {new Date(fav.addedAt).toLocaleString()}</p>
                      <button onClick={() => removeFavorite(favorites.indexOf(fav))}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={resetFavorites} className="reset_button">
            Reset Favorites
          </button>
        </>
      )}
      <Backdrop
        sx={{ color: '#0000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isNewDataLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Favorites;
export { addFavorite };