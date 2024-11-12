import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch } from 'react-icons/fa';

const Header = ({ user, handleLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log('User state in Header:', user);
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <header className="bg-black bg-opacity-90 text-white p-4 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <Link to="/" className="bg-clip-text text-transparent bg-gradient-to-r font-bold text-4xl from-white to-blue-400 shrink-0">GAMEON</Link>
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, players, tournaments..."
              className="w-full bg-white/10 text-white placeholder-white/50 px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isLoggedIn && user ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: getRandomColor() }}>
                {getInitials(user.name)}
              </div>
              <div className="text-left mr-4">
                <div className="text-sm font-medium text-white/90">{user.name}</div>
                <div className="text-xs text-white/60 truncate max-w-[120px]">{user.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;