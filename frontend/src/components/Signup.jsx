import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa'; // Icons for GitHub and Google

export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate sign-up success
    console.log('Signed up successfully');
    navigate('/dashboard');
  };

  const handleGithubSignup = () => {
    // Simulate GitHub signup
    console.log('Signing up with GitHub');
    // Redirect to dashboard after signup
    navigate('/');
  };

  const handleGoogleSignup = () => {
    // Simulate Google signup
    console.log('Signing up with Google');
    // Redirect to dashboard after signup
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-[#202020] p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

      {/* Sign-up Form */}
      <form onSubmit={handleSignup}>
      <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#303030] text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#303030] text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#303030] text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="px-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Social Signup Buttons */}
      <div className="flex flex-col gap-4">
        <button
          onClick={handleGithubSignup}
          className="w-full bg-gray-800 text-white p-3 rounded-lg flex items-center justify-center hover:bg-gray-900 transition-colors"
        >
          <FaGithub className="mr-2" /> Sign up with GitHub
        </button>
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-red-500 text-white p-3 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <FaGoogle className="mr-2" /> Sign up with Google
        </button>
      </div>

      {/* Login Redirect */}
      <p className="mt-6 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
