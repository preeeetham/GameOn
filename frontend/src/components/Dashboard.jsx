import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import GameCard from './GameCard';

const Dashboard = ({ user, setUser }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('trending');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear token on logout
  };

  const fetchGames = async (pageNumber = 1) => {
    try {
      setLoading(true);
      let params = { page: pageNumber };

      switch (filter) {
        case 'last30days':
          params.dates = `${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]},${new Date().toISOString().split('T')[0]}`;
          break;
        case 'thisweek':
          params.dates = `${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]},${new Date().toISOString().split('T')[0]}`;
          break;
        case 'nextweek':
          params.dates = `${new Date().toISOString().split('T')[0]},${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}`;
          break;
        case 'action':
          params.genres = 'action'; // Filter by genre
          break;
        case 'strategy':
          params.genres = 'strategy'; // Filter by genre
          break;
        case 'adventure':
          params.genres = 'adventure'; // Filter by genre
          break;
        default:
          const today = new Date();
          const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
          params.dates = `${lastMonth.toISOString().split('T')[0]},${today.toISOString().split('T')[0]}`;
      }

      const response = await axios.get('https://game-on-web.vercel.app/api/games', { params });
      const data = response.data;
      
      if (pageNumber === 1) {
        setGames(data.results);
      } else {
        setGames(prevGames => [...prevGames, ...data.results]);
      }
      setHasMore(data.next !== null);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchGames(1);
  }, [filter]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchGames(nextPage);
  };

  const getHeadingText = () => {
    switch (filter) {
      case 'last30days':
        return 'TOP GAMES FROM THE LAST 30 DAYS';
      case 'thisweek':
        return 'TOP GAMES THIS WEEK';
      case 'nextweek':
        return 'UPCOMING GAMES NEXT WEEK';
      case 'action':
        return 'TOP ACTION GAMES';
      case 'strategy':
        return 'TOP STRATEGY GAMES';
      case 'adventure':
        return 'TOP ADVENTURE GAMES';
      default:
        return 'NEW AND TRENDING';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header user={user} handleLogout={handleLogout} setUser={setUser} />
      <div className="flex">
        <Sidebar setFilter={setFilter} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="mb-3 text-5xl font-bold text-white/90 tracking-wider">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                {getHeadingText()}
              </span>
            </h1>
            <h1 className="mb-8 text-white/90 tracking-wider">
              <span>
                Based on player counts and release date
              </span>
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            
            {loading && (
              <div className="flex justify-center mt-8">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-3 w-3 bg-white/20 rounded-full"></div>
                  <div className="h-3 w-3 bg-white/20 rounded-full"></div>
                  <div className="h-3 w-3 bg-white/20 rounded-full"></div>
                </div>
              </div>
            )}
            
            {hasMore && !loading && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-white/10 border border-white/20 text-white/80 rounded-lg 
                           hover:bg-white/20 transition-all duration-300 backdrop-blur-sm
                           shadow-lg hover:shadow-white/5"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
