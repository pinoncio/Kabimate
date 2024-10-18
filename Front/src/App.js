import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/Login';
import Admin from './pages/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página de inicio */}
        <Route path="/login" element={<Login />} /> {/* Página de login */}
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
  );
};

export default App;
