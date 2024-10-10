'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Grid, List, Star, Calendar } from 'lucide-react';

const API_KEY = 'e2f574f13445467d9539b577eed62452';
const BASE_URL = 'https://api.rawg.io/api';

const fetchGames = async (page = 1, pageSize = 20, ordering = '-relevance') => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}&ordering=${ordering}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch games: ${error.message}`);
  }
};

const fetchPlatforms = async () => {
  try {
    const response = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(`Failed to fetch platforms: ${error.message}`);
  }
};

const GameCard = ({ game }) => {
  const [expanded, setExpanded] = useState(false);

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'pc':
        return '🖥️';
      case 'playstation':
        return '🎮';
      case 'xbox':
        return '🕹️';
      default:
        return '📱';
    }
  };

  return (
    <div
      className={`w-full max-w-md bg-gray-950 border-gray-800 rounded-lg relative overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.2),0_0_45px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.3),0_0_60px_rgba(255,255,255,0.2)] ${expanded ? 'h-auto' : 'h-96'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.background_image || '/placeholder.svg?height=192&width=384'}
          alt={game.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-gray-100">{game.name}</h3>
      </div>
      <div className="p-6 pt-0 items-center justify-center">
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-blue-400 relative rounded-lg flex items-center justify-center p-2">
            <Star className="text-white mr-1" size={16} />
            <span className="text-white">{game.rating.toFixed(1)}/5</span>
          </div>
          <div className="bg-green-400 relative rounded-lg flex items-center justify-center p-2">
            <Calendar className="text-white mr-1" size={16} />
            <span className="text-white">{new Date(game.released).getFullYear()}</span>
          </div>
        </div>
        <div className={`bg-gray-900 p-4 rounded-lg border border-gray-800 mt-4 ${expanded ? 'block' : 'hidden'}`}>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Game Details</h3>
          <p className="text-sm text-gray-300">{game.description_raw ? `${game.description_raw.slice(0, 200)}...` : 'No description available.'}</p>
          <div className="mt-2">
            <h4 className="text-md font-semibold text-gray-100">Genres:</h4>
            <p className="text-sm text-gray-300">{game.genres.length > 0 ? game.genres.map(genre => genre.name).join(', ') : 'Not specified'}</p>
          </div>
          <div className="mt-2">
            <h4 className="text-md font-semibold text-gray-100">Platforms:</h4>
            <p className="text-sm text-gray-300">
              {game.parent_platforms && game.parent_platforms.length > 0
                ? game.parent_platforms.map(p => getPlatformIcon(p.platform.name)).join(' ')
                : 'Not specified'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function GamePlatform() {
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState('-relevance');
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await fetchGames(page, 20, ordering);
        setGames((prevGames) => [...prevGames, ...data.results]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const loadPlatforms = async () => {
      try {
        const platformsData = await fetchPlatforms();
        setPlatforms(platformsData);
      } catch (err) {
        console.error('Failed to load platforms:', err);
      }
    };

    loadGames();
    loadPlatforms();
  }, [page, ordering]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOrderChange = (newOrdering) => {
    setOrdering(newOrdering);
    setGames([]);
    setPage(1);
  };

  const handlePlatformChange = (platformId) => {
    setSelectedPlatform(platformId);
    setGames([]);
    setPage(1);
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-2xl font-bold">RAWG</div>
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search 874,505 games"
                className="w-full bg-gray-700 rounded-md py-2 px-4 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="space-x-4">
            <button className="bg-gray-700 px-4 py-2 rounded-md">LOG IN</button>
            <button className="bg-gray-700 px-4 py-2 rounded-md">SIGN UP</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">New and trending</h1>
        <p className="text-gray-400 mb-4">Based on player counts and release date</p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <div className="relative">
              <button className="bg-gray-700 px-4 py-2 rounded-md flex items-center">
                Order by: {ordering === '-relevance' ? 'Relevance' : 'Rating'} <ChevronDown className="ml-2" />
              </button>
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button
                    onClick={() => handleOrderChange('-relevance')}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white w-full text-left"
                  >
                    Relevance
                  </button>
                  <button
                    onClick={() => handleOrderChange('-rating')}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white w-full text-left"
                  >
                    Rating
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <button className="bg-gray-700 px-4 py-2 rounded-md flex items-center">
                Platform: {selectedPlatform || 'All'} <ChevronDown className="ml-2" />
              </button>
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button
                    onClick={() => handlePlatformChange(null)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white w-full text-left"
                  >
                    All Platforms
                  </button>
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformChange(platform.id)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white w-full text-left"
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-gray-700' : ''}`}>
              <Grid />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-gray-700' : ''}`}>
              <List />
            </button>
          </div>
        </div>

        {loading && <div className="text-center">Loading...</div>}

        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {!loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-gray-700 px-6 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-600"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
