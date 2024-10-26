import React from 'react';

const Sidebar = ({ setFilter }) => {
  return (
    <div className="w-56 bg-black p-6 h-screen">
      <h2 className="text-2xl font-bold mb-6 px-8 text-white tracking-wider">Filters</h2>
      <nav className="space-y-3">
        <button
          onClick={() => setFilter('trending')}
          className="w-full text-left py-3 px-6 rounded-lg text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:translate-x-1 border border-transparent hover:border-gray-800"
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">⚡</span>
            <span className="font-medium">Trending</span>
          </div>
        </button>
        
        <button
          onClick={() => setFilter('last30days')}
          className="w-full text-left py-3 px-6 rounded-lg text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:translate-x-1 border border-transparent hover:border-gray-800"
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">📅</span>
            <span className="font-medium">Last 30 Days</span>
          </div>
        </button>
        
        <button
          onClick={() => setFilter('thisweek')}
          className="w-full text-left py-3 px-6 rounded-lg text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:translate-x-1 border border-transparent hover:border-gray-800"
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">🗓️</span>
            <span className="font-medium">This Week</span>
          </div>
        </button>
        
        <button
          onClick={() => setFilter('nextweek')}
          className="w-full text-left py-3 px-6 rounded-lg text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:translate-x-1 border border-transparent hover:border-gray-800"
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">⏳</span>
            <span className="font-medium">Next Week</span>
          </div>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;