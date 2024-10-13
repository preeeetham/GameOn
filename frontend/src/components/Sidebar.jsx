import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { ChevronDown } from 'lucide-react';

export default function Sidebar() {
  const platforms = ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'];
  const genres = ['Action', 'Adventure', 'RPG', 'Shooter', 'Puzzle'];

  return (
    <aside className="w-48 space-y-8">
      <nav>
        <ul className="space-y-4 list-none mb-4">
          <li>
            {/* Navigate to home */}
            <Link to="/" className="hover:text-gray-300 text-xl font-bold">Home</Link>
          </li> 
          <li>
            {/* Navigate to New Releases (thisweek filter) */}
            <Link to="/games/thisweek" className="hover:text-gray-300 text-xl font-bold">New Releases</Link>
          </li>
        </ul>
      </nav>

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
  );
}
