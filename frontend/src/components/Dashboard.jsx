import React from 'react';
import GameList from './GameList.jsx';

export default function Dashboard() {
  return (
    <div className=''>
      <h1 className="text-6xl font-bold mb-2 ">New and Trending</h1>
      <p className='mb-8 '>Based on player counts and release date</p>
      <GameList />
    </div>
  );
}
