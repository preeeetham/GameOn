import React from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="bg-[#151515] text-white min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Routes without Header and Sidebar */}
          <Route
            path="/login"
            element={
              <div className="flex justify-center items-center min-h-screen px-4">
                {/* Added padding and a larger max-width to the card */}
                <div className="bg-[#202020] rounded-lg shadow-lg w-96 max-w-lg">
                  <Login />
                </div>
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="flex justify-center items-center min-h-screen px-2">
                {/* Same adjustments for Signup */}
                <div className="bg-[#202020]  rounded-lg shadow-lg w-96 max-w-lg">
                  <Signup />
                </div>
              </div>
            }
          />

          {/* Routes with Header and Sidebar */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen">
                <Header />
                <main className="container mx-auto px-4 py-8 flex">
                  <Sidebar />
                  <div className="flex-1 ml-8">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      {/* Add more protected routes if needed */}
                    </Routes>
                  </div>
                </main>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
