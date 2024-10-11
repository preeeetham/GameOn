import React from 'react'
import { Search, Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-[#202020] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold">RAWG</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Reviews</a></li>
              <li><a href="#" className="hover:text-gray-300">New Releases</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search games..."
              className="bg-[#3b3b3b] text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="p-2 hover:bg-[#3b3b3b] rounded-full">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-[#3b3b3b] rounded-full">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}