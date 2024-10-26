import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch } from 'react-icons/fa';

const Header = ({ user, handleLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log('User state in Header:', user);
  }, [user]);

  // Generate a random color for avatar background
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Generate initials from user name
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-black bg-opacity-90 text-white p-4 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <Link to="/" className="bg-clip-text text-transparent bg-gradient-to-r font-bold text-4xl from-white to-blue-400 shrink-0">
          GAMEON
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, players, tournaments..."
              className="w-full bg-white/10 text-white placeholder-white/50 px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition duration-300"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
          </div>
        </div>

        {/* User Profile Section */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition duration-300 backdrop-blur-sm"
          >
            {user ? (
              <>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {getInitials(user.name)}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white/90">{user.name}</div>
                  <div className="text-xs text-white/60 truncate max-w-[120px]">{user.email}</div>
                </div>
              </>
            ) : (
              <>
                <FaUser className="text-white/80" />
                <span className="text-white/90">Guest</span>
              </>
            )}
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-black/95 rounded-lg shadow-xl py-2 border border-white/10 backdrop-blur-lg">
              {user ? (
                <>
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{user.name}</div>
                        <div className="text-sm text-white/60 truncate">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition duration-200"
                  >
                    Profile Settings
                  </Link>
                  <Link
                    to="/my-games"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition duration-200"
                  >
                    My Games
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;