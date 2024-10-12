import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { getTrendingGames } from '../api';
import dayjs from 'dayjs';

export default function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(getTrendingGames);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);

        let params = {};
        if (filter === 'last30days') {
          const today = dayjs().format('YYYY-MM-DD');
          const last30Days = dayjs().subtract(30, 'days').format('YYYY-MM-DD');
          params.dates = `${last30Days},${today}`;
        } else if (filter === 'thisweek') {
          const startOfWeek = dayjs().startOf('week').format('YYYY-MM-DD');
          const endOfWeek = dayjs().endOf('week').format('YYYY-MM-DD');
          params.dates = `${startOfWeek},${endOfWeek}`;
        } else if (filter === 'nextweek') {
          const startOfNextWeek = dayjs().add(1, 'week').startOf('week').format('YYYY-MM-DD');
          const endOfNextWeek = dayjs().add(1, 'week').endOf('week').format('YYYY-MM-DD');
          params.dates = `${startOfNextWeek},${endOfNextWeek}`;
        }

        const data = await getTrendingGames(params);
        setGames(data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filter]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-[#202020] rounded-lg h-80 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setFilter('last30days')}
          className={`p-2 rounded ${filter === 'last30days' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
        >
          Last 30 Days
        </button>
        <button 
          onClick={() => setFilter('thisweek')}
          className={`p-2 rounded ${filter === 'thisweek' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
        >
          This Week
        </button>
        <button 
          onClick={() => setFilter('nextweek')}
          className={`p-2 rounded ${filter === 'nextweek' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
        >
          Next Week
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
