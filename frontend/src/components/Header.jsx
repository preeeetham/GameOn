import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSearch, FaGithub } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem('token');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };
  const handlegithub = () => {
    window.open("https://github.com/preeeetham/gameon", "_blank");
  }

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.get(`https://game-on-web.vercel.app/api/games`, {
        params: {
          page_size: 5,
          search: query,
          page: 1,
          key: 'API_KEY'
        }
      });
      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error("Error fetching game suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <header className="bg-black bg-opacity-90 text-white p-4 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <Link to="/" className="bg-clip-text text-transparent bg-gradient-to-r font-bold text-4xl from-white to-blue-400 shrink-0">GAMEON</Link>
        <div className="flex-1 max-w-2xl relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full bg-white/10 text-white placeholder-white/50 px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
          </div>
          
          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto w-full">
              {suggestions.map((game) => (
                <div
                  key={game.id}
                  className="p-2 hover:bg-gray-700 cursor-pointer text-white"
                  onClick={() => {
                    setSearchQuery(game.name);
                    setSuggestions([]);
                  }}
                >
                  {game.name}
                </div>
              ))}
            </div>
          )}
          
          {suggestions.length === 0 && !loading && searchQuery.length >= 3 && (
            <div className="p-2 text-white">No suggestions found</div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-4">
          <button onClick={handlegithub} className=" hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300">
            <FaGithub />
          </button>
        </div>
          {user ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: getRandomColor() }}>
                {getInitials(user.name)}
              </div>
              <div className="text-left mr-4">
                <div className="text-xl font-semibold text-white/90">Welcome!! {user.name}</div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300"
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

const getInitials = (name) => {
  return name.split(' ').map(part => part.charAt(0).toUpperCase()).join('');
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default Header;