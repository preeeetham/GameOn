import React, { useState, useRef, useEffect } from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { FaPlaystation, FaXbox, FaWindows, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { SiNintendoswitch, SiMacos } from "react-icons/si";

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => setIsExpanded(false);

  const platformIcons = {
    PlayStation: <FaPlaystation />,
    Xbox: <FaXbox />,
    PC: <FaWindows />,
    'Nintendo Switch': <SiNintendoswitch />,
    macOS: <SiMacos />,
    Linux: <FaLinux />,
    iOS: <FaApple />,
    Android: <FaAndroid />
  };

  const renderPlatformIcons = (platforms) => {
    if (!Array.isArray(platforms)) return null;
    return platforms.map(platform => {
      const icon = platformIcons[platform.platform.name];
      return icon ? <span key={platform.platform.id} className="mr-2">{icon}</span> : null;
    });
  };

  const CompactCard = () => (
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
        <div className="flex space-x-2 mb-2">
          {renderPlatformIcons(game.platforms)}
        </div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold truncate mr-2 cursor-pointer hover:text-gray-400 transition-colors duration-300" onClick={handleExpand}>{game.name}</h2>
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
            <hr className="border-gray-600 my-2" />
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

  const ExpandedCard = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="bg-zinc-900 text-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-zinc-900">
          <div className="relative">
            <img 
              src={game.background_image} 
              alt={game.name} 
              className="w-full h-64 object-cover"
            />
            <button 
              onClick={handleCollapse}
              className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <div className="p-6 border-b border-zinc-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{game.name}</h2>
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" aria-hidden="true" />
                <span className="text-lg">{game.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Platforms:</h3>
            <div className="flex flex-wrap gap-2">
              {renderPlatformIcons(game.platforms)}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Release Date:</h3>
            <p>{new Date(game.released).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Genres:</h3>
            <p>{game.genres.map(genre => genre.name).join(', ')}</p>
          </div>
          {game.chart_position && (
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Chart Position:</h3>
              <p>{game.chart_position}</p>
            </div>
          )}
          {game.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description:</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{game.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return isExpanded ? <ExpandedCard /> : <CompactCard />;
};

export default GameCard;