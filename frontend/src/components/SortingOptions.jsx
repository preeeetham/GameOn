import React from 'react';

const SortingOptions = ({ platforms, viewMode, setViewMode, handleOrderChange, handlePlatformChange }) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => setViewMode('grid')}
        >
          Grid View
        </button>
        <button
          className={`px-4 py-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-700'}`}
          onClick={() => setViewMode('list')}
        >
          List View
        </button>
      </div>

      <select onChange={(e) => handleOrderChange(e.target.value)} className="bg-gray-700 rounded-md px-4 py-2">
        <option value="-relevance">Sort by Relevance</option>
        <option value="-rating">Sort by Rating</option>
        <option value="-added">Sort by Date Added</option>
      </select>
    </div>
  );
};

export default SortingOptions;
