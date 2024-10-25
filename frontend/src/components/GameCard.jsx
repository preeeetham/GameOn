import React, { useState, useRef, useEffect } from 'react';
import { Star, ArrowLeft, Play } from 'lucide-react'; // Import Play icon
import { FaPlaystation, FaXbox, FaWindows, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { SiNintendoswitch, SiMacos } from "react-icons/si";
import { getGameTrailers } from '../api.js';

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [gameTrailerUrl, setGameTrailerUrl] = useState(null);
  const videoRef = useRef(null);

  // Fetch game trailer based on game ID
  const fetchGameTrailer = async (gameId) => {
    try {
      const trailers = await getGameTrailers(gameId);
      if (trailers && trailers.length > 0) {
        return trailers[0].data.max; // Return the highest quality trailer URL
      }
      return null; // No trailers available
    } catch (error) {
      console.error('Error fetching game trailer:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      if (isExpanded) {
        try {
          const trailerUrl = await fetchGameTrailer(game.id);
          if (trailerUrl) {
            setGameTrailerUrl(trailerUrl);
          }
        } catch (error) {
          setVideoError(true); // Handle errors during fetching
        }
      }
    };

    fetchTrailer();
  }, [isExpanded, game.id]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => setIsExpanded(false);

  const platformIcons = {
    PlayStation: <FaPlaystation />,
    Xbox: <FaXbox />,
    PC: <FaWindows />,
    Nintendo: <SiNintendoswitch />,
    macOS: <SiMacos />,
    Linux: <FaLinux />,
    iOS: <FaApple />,
    Android: <FaAndroid />,
  };

  const renderPlatformIcons = (platforms) => {
    if (!Array.isArray(platforms)) return null;
    return game.parent_platforms.map(platform => {
      const icon = platformIcons[platform.platform.name];
      return icon ? (
        <span key={platform.platform.id} className="mr-2" title={platform.platform.name}>
          {icon}
        </span>
      ) : null;
    });
  };

  const CompactCard = () => (
    <div
      className="w-72 bg-zinc-900 text-white overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_5px_rgba(255,0,0,0.5)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-36">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex mb-2">
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm overflow-y-auto"
      onClick={handleCollapse}
    >
      <div
        className="bg-white bg-opacity-10 text-white rounded-3xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-black bg-opacity-10 text-white ">
          <div className="relative h-96">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-2">
              {gameTrailerUrl ? (
                <div className="col-span-2 row-span-2 relative">
                  <video
                    ref={videoRef}
                    src={gameTrailerUrl}
                    className="w-full h-full object-cover rounded-2xl"
                    muted
                    loop
                    playsInline
                    onError={() => setVideoError(true)}
                  />
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                      }
                    }}
                    className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300"
                    title="Play Trailer"
                  >
                    <Play size={20} />
                  </button>
                </div>
              ) : (
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="col-span-2 row-span-2 w-full h-full object-cover rounded-2xl"
                />
              )}
              {game.short_screenshots && game.short_screenshots.slice(1, 6).map((screenshot, index) => (
                <img
                  key={screenshot.id}
                  src={screenshot.image}
                  alt={`${game.name} screenshot ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ))}
            </div>
            {/* Close button */}
            <button
              onClick={handleCollapse}
              className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          {/* Game details */}
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
        {/* Additional information */}
        <div className="p-6 space-y-6">
          {/* Platforms */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Platforms:</h3>
            <div className="flex flex-wrap gap-2 ">
              {renderPlatformIcons(game.platforms)}
            </div>
          </div>

          {/* Release Date */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Release Date:</h3>
            <p>{new Date(game.released).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
          </div>

          {/* Genres */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Genres:</h3>
            <p>{game.genres.map(genre => genre.name).join(', ')}</p>
          </div>

          {/* Description */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Description:</h3>
            {/* Render raw HTML safely */}
            <p 
              className="text-gray-400" 
              dangerouslySetInnerHTML={{ __html: game.description_raw }} 
            />
          </div>

        </div>
      </div>
    </div>
  );

  return isExpanded ? <ExpandedCard /> : <CompactCard />;
};

export default GameCard;