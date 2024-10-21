import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider} from './services/AuthContext'; 
import Home from './pages/Home'; 
import Login from './pages/Login';
import Admin from './pages/Admin';
import UserPage from './pages/User';
import RolPage from './pages/rol';
import Insti from './pages/Insti';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página de inicio */}
        <Route path="/login" element={<Login />} /> {/* Página de login */}
        <Route path="/admin" element={<Admin/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path="/rol" element={<RolPage/>} />
        <Route path='/insti' element={<Insti/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
