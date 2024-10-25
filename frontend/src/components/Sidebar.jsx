import React from 'react'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ currentFilter }) {
  const navigate = useNavigate();
  const platforms = ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch']
  const genres = ['Action', 'Adventure', 'RPG', 'Shooter', 'Puzzle']
  
  const handleFilterClick = (filter) => {
    navigate(`/${filter}`);
  };

  return (
    <aside className="w-48 space-y-8">
      <nav>
        <ul className="space-y-4 list-none mb-4">
          <li>
            <a href="#" className="hover:text-gray-300 text-xl font-bold">New Releases</a>
          </li>
        </ul>
      </nav>

      {/* Time Filter Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Time Period</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleFilterClick('last30days')}
              className={`w-full text-left py-2 px-3 rounded ${
                currentFilter === 'last30days' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              Last 30 Days
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterClick('thisweek')}
              className={`w-full text-left py-2 px-3 rounded ${
                currentFilter === 'thisweek' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              This Week
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterClick('nextweek')}
              className={`w-full text-left py-2 px-3 rounded ${
                currentFilter === 'nextweek' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              Next Week
            </button>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Platforms</h2>
        <ul className="space-y-2">
          {platforms.map((platform) => (
            <li key={platform} className="flex items-center">
              <input type="checkbox" id={platform} className="mr-2" />
              <label htmlFor={platform}>{platform}</label>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Genres</h2>
        <ul className="space-y-2">
          {genres.map((genre) => (
            <li key={genre} className="flex items-center">
              <input type="checkbox" id={genre} className="mr-2" />
              <label htmlFor={genre}>{genre}</label>
            </li>
          ))}
        </ul>
      </div>
      
      <button className="flex items-center text-gray-400 hover:text-white">
        Show more <ChevronDown className="ml-2" size={16} aria-hidden="true" />
      </button>
    </aside>
  )
}