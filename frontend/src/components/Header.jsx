import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black-800 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold">GAMEON</div>
        <div className="flex-1 mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search 874,505 games"
              className="w-full bg-gray-700 rounded-md py-2 px-4 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="space-x-4">
          <button className="bg-gray-700 px-4 py-2 rounded-md">LOG IN</button>
          <button className="bg-gray-700 px-4 py-2 rounded-md">SIGN UP</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
