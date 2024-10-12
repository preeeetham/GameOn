import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import Header from './components/Header.jsx';
import Sidebar from './components/Slidebar.jsx';
import GameList from './components/GameList.jsx';
// import dotenv from 'dotenv';

// dotenv.config();


const domain = 'dev-ombsf612abmbnh4w.us.auth0.com'; 
const clientId = 'R2BI8rjDg12HFKKAEe1fAjBOwYhEMVs6'; 

export default function App() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <div className="min-h-screen bg-[#151515] text-white">
        <Header />
        <main className="container mx-auto px-4 py-8 flex">
          <Sidebar />
          <div className="flex-1 ml-8">
            <h1 className="text-6xl font-bold mb-2">New and trending</h1>
            <p className='mb-8'>Based on player counts and release date</p>
            <GameList />
          </div>
        </main>
      </div>
    </Auth0Provider>
  );
}
