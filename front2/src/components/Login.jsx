import React from "react";
import axios from 'axios';

export default function Login() {
  const handleGoogle = () => {
    window.open("https://game-onn.vercel.app/v1/auth/google/", "_self"); // Open in the same tab
  };

  const handleGitHub = () => {
    window.open("https://game-onn.vercel.app/v1/auth/github/", "_self"); // Open in the same tab
  };
  
  const handleSubmit = () => {
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex justify-between mb-4">
          <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Login
        </button>
        <div className="flex items-center justify-center mt-4">
          <span className="text-gray-400">Or login with</span>
        </div>
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleGoogle} // Attach the Google login function
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition mr-2"
          >
            Google
          </button>
          <button 
            onClick={handleGitHub} // Attach the GitHub login function
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
