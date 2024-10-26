import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Signup = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://game-on-web.vercel.app/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#111111] p-10 rounded-2xl w-[420px] backdrop-blur-lg backdrop-filter">
        <h2 className="text-4xl font-bold mb-10 text-white text-center tracking-tight">
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-xl 
                         text-white placeholder-gray-500 focus:outline-none focus:border-blue-500
                         transition duration-300 ease-in-out"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-xl 
                         text-white placeholder-gray-500 focus:outline-none focus:border-blue-500
                         transition duration-300 ease-in-out"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2.5 bg-black/50 border border-gray-800 rounded-xl 
                         text-white placeholder-gray-500 focus:outline-none focus:border-blue-500
                         transition duration-300 ease-in-out"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium
                       hover:bg-blue-700 transform hover:scale-[1.02] 
                       transition-all duration-300 ease-in-out
                       shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            Create your account
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#111111] text-gray-400 uppercase tracking-wider">or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <a
              href="https://game-on-web.vercel.app/auth/google"
              className="flex items-center justify-center px-4 py-3.5 border border-gray-800 
                         rounded-xl text-white hover:bg-black/50
                         transition duration-300 ease-in-out group"
            >
              <FaGoogle className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Google
            </a>
            <a
              href="https://game-on-web.vercel.app/auth/github"
              className="flex items-center justify-center px-4 py-3.5 border border-gray-800 
                         rounded-xl text-white hover:bg-black/50
                         transition duration-300 ease-in-out group"
            >
              <FaGithub className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              GitHub
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-blue-500 hover:text-blue-400
                       transition-colors duration-300"
          >
            Login in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;