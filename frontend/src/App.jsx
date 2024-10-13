import React from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import GameList from './components/GameList.jsx';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-[#151515] text-white">
      <Header />
      <main className="container mx-auto px-4 py-8 flex">
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
        
        <div className="flex-1 ml-8">
          <h1 className="text-6xl font-bold mb-2">New and trending</h1>
          <p className='mb-8'>Based on player counts and release date</p>
          <GameList />
        </div>
      </main>
    </div>
  );
}
