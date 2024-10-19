import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider} from './services/AuthContext'; 
import Home from './pages/Home'; 
import Login from './pages/Login';
import Admin from './pages/Admin';
import UserPage from './pages/User';
import RolPage from './pages/rol';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página de inicio */}
        <Route path="/login" element={<Login />} /> {/* Página de login */}
        <Route path="/admin" element={<Admin/>} />
        <Route path="/userc" element={<UserPage/>} />
        <Route path="/rolc" element={<RolPage/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
