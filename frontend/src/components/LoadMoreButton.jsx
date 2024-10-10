// src/components/LoadMoreButton.jsx
import React from 'react';

const LoadMoreButton = ({ onLoadMore }) => {
  return (
    <div className="text-center mt-6">
      <button
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        onClick={onLoadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;
