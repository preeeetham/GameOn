import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'; // Ensure this component also uses the user state

const App = () => {
  const [user, setUser] = useState(null);

  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        {/* Other routes... */}
      </Routes>
    </Router>
  );
};

export default App;
