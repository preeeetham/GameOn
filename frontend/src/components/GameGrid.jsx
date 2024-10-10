import React from 'react';
import GameCard from '../components/GameCard';

const GameGrid = ({ games, viewMode, loading }) => {
  return (
    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
      {loading && <div className="text-center mt-4">Loading...</div>}
    </div>
  );
};

export default GameGrid;
