import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { getTrendingGames } from '../api.js';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export default function GameList() {
  const { filterParam } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(filterParam || '');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchGames = async (pageNumber = 1) => {
    try {
      setLoading(true);

      let params = { page: pageNumber };
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

  useEffect(() => {
    setFilter(filterParam);
    setPage(1);
  }, [filterParam]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchGames(nextPage);
  };

  const renderLoadingSkeletons = () => {
    return [...Array(8)].map((_, index) => (
      <div key={index} className="bg-[#202020] rounded-lg h-80 animate-pulse"></div>
    ));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex space-x-4 mb-6 overflow-x-auto py-2">
        <button 
          onClick={() => setFilter('last30days')}
          className={`p-2 rounded whitespace-nowrap ${filter === 'last30days' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
        >
          Last 30 Days
        </button>
        <button 
          onClick={() => setFilter('thisweek')}
          className={`p-2 rounded whitespace-nowrap ${filter === 'thisweek' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}hover:bg-red-500 duration-300 transition-colors`}
        >
          This Week
        </button>
        <button 
          onClick={() => setFilter('nextweek')}
          className={`p-2 rounded whitespace-nowrap ${filter === 'nextweek' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
        >
          Next Week
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
        {loading && renderLoadingSkeletons()}
      </div>
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleLoadMore}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
}