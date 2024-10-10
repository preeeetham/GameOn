import React from 'react';

const FormFilter = ({ platforms, selectedPlatform, onPlatformChange }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          className={`px-4 py-2 rounded-md transition duration-300 ${
            selectedPlatform === platform.id ? 'bg-blue-600' : 'bg-gray-700'
          }`}
          onClick={() => onPlatformChange(platform.id)}
        >
          {platform.name}
        </button>
      ))}
    </div>
  );
};

export default FormFilter;
