// src/components/GameCard.jsx
import React, { useState } from 'react';
import { Star, Calendar } from 'lucide-react';

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
      className={`w-full max-w-md bg-gray-950 border-gray-800 rounded-lg relative overflow-hidden
                  shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.2),0_0_45px_rgba(255,255,255,0.1)]
                  transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.3),0_0_60px_rgba(255,255,255,0.2)]
                  ${expanded ? 'h-auto' : 'h-96'}`}
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
        <div className='flex items-center justify-center space-x-4'>
          <div className='bg-blue-400 relative rounded-lg flex items-center justify-center p-2'>
            <Star className="text-white mr-1" size={16} />
            <span className='text-white'>{game.rating.toFixed(1)}/5</span>
          </div>
          <div className='bg-green-400 relative rounded-lg flex items-center justify-center p-2'>
            <Calendar className="text-white mr-1" size={16} />
            <span className='text-white'>{new Date(game.released).getFullYear()}</span>
          </div>
        </div>
        <div className={`bg-gray-900 p-4 rounded-lg border border-gray-800 mt-4 ${expanded ? 'block' : 'hidden'}`}>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Game Details</h3>
          <p className="text-sm text-gray-300">{game.description_raw ? `${game.description_raw.slice(0, 100)}...` : 'No description available.'}</p>
          <div className="mt-2 text-xs text-gray-400">
            <span>Platforms: {game.platforms?.map(p => getPlatformIcon(p.platform.slug)).join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
