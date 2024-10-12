import React, { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isHovered && videoRef.current && game.trailer_url) {
      videoRef.current.play().catch(error => console.error("Error playing video:", error));
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, game.trailer_url]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div 
      className="w-72 bg-zinc-900 text-white overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_5px_rgba(255,0,0,0.5)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-36">
        {game.trailer_url && isHovered ? (
          <video
            ref={videoRef}
            src={game.trailer_url}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          />
        ) : (
          <img 
            src={game.background_image} 
            alt={game.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold truncate mr-2">{game.name}</h2>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" aria-hidden="true" />
            <span className="text-sm">{game.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-40' : 'max-h-0'}`}>
          <div className="text-sm text-gray-400 mt-2 space-y-1">
            <div className="flex justify-between">
              <span>Release date:</span>
              <span className="text-white">{new Date(game.released).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <hr className="border-gray-600 my-5" />
            <div className="flex justify-between">
              <span>Genres:</span>
              <span className="text-white">
                {game.genres.slice(0, 2).map(genre => genre.name).join(', ')}
                {game.genres.length > 2 && '...'}
              </span>
            </div>
            {game.chart_position && (
              <div className="flex justify-between">
                <span>Chart:</span>
                <span className="text-white">{game.chart_position}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;