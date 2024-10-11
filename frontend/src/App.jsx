import React from 'react'
import Header from './components/Header.jsx'
import Sidebar from './components/Slidebar.jsx'
import GameList from './components/GameList.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#151515] text-white">
      <Header />
      <main className="container mx-auto px-4 py-8 flex">
        <Sidebar />
        <div className="flex-1 ml-8">
          <h1 className="text-4xl font-bold mb-8">New and trending</h1>
          <GameList />
        </div>
      </main>
    </div>
  )
}