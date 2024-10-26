import React, { useState, useRef, useEffect } from 'react';
import { Star, ArrowLeft, Play } from 'lucide-react';
import { FaPlaystation, FaXbox, FaWindows, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { SiNintendoswitch, SiMacos } from "react-icons/si";
import axios from 'axios';

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [gameTrailerUrl, setGameTrailerUrl] = useState(null);
  const videoRef = useRef(null);

  // Keep all existing fetch and effect logic unchanged
  const fetchGameTrailer = async (gameId) => {
    try {
      const response = await axios.get(`https://game-on-web.vercel.app/api/games/${gameId}/trailers`);
      const trailers = response.data;
      if (trailers && trailers.length > 0) {
        return trailers[0].data.max;
      }
      return null;
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
          setVideoError(true);
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
        <span key={platform.platform.id} className="mr-2 text-white/60" title={platform.platform.name}>
          {icon}
        </span>
      ) : null;
    });
  };

  const CompactCard = () => (
    <div
      className="w-72 bg-black/40 border border-white/10 text-white/90 overflow-hidden rounded-lg 
                 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
                 backdrop-blur-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-36">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
        />
      </div>
      <div className="p-4">
        <div className="flex mb-2">
          {renderPlatformIcons(game.platforms)}
        </div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold truncate mr-2 cursor-pointer hover:text-white/100 
                       transition-colors duration-300" 
              onClick={handleExpand}
          >
            {game.name}
          </h2>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-white/80 mr-1" />
            <span className="text-sm">{game.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-40' : 'max-h-0'}`}>
          <div className="text-sm text-white/60 mt-2 space-y-1">
            <div className="flex justify-between">
              <span>Release date:</span>
              <span className="text-white/80">{new Date(game.released).toLocaleDateString()}</span>
            </div>
            <hr className="border-white/10 my-2" />
            <div className="flex justify-between">
              <span>Genres:</span>
              <span className="text-white/80">
                {game.genres.slice(0, 2).map(genre => genre.name).join(', ')}
                {game.genres.length > 2 && '...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ExpandedCard = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm overflow-y-auto"
      onClick={handleCollapse}
    >
      <div
        className="bg-black/50 border border-white/10 text-white/90 rounded-3xl shadow-2xl 
                   w-full max-w-3xl my-8 overflow-hidden backdrop-blur-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10">
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
                    className="absolute bottom-2 right-2 bg-white/10 text-white p-2 rounded-full
                             hover:bg-white/20 transition-all duration-300"
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
                  className="w-full h-full object-cover rounded-2xl opacity-80 hover:opacity-100 
                           transition-opacity duration-300"
                />
              ))}
            </div>
            <button
              onClick={handleCollapse}
              className="absolute top-4 left-4 bg-black/30 text-white/90 p-2 rounded-full
                       hover:bg-white/10 transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white/90">{game.name}</h2>
              <div className="flex items-center">
                <Star className="w-6 h-6 text-white/80 mr-2" />
                <span className="text-lg">{game.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white/80">Platforms:</h3>
            <div className="flex flex-wrap gap-2 text-white/60">
              {renderPlatformIcons(game.platforms)}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white/80">Release Date:</h3>
            <p className="text-white/70">{new Date(game.released).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white/80">Genres:</h3>
            <p className="text-white/70">{game.genres.map(genre => genre.name).join(', ')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white/80 mb-2">Description:</h3>
            <p 
              className="text-white/70" 
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