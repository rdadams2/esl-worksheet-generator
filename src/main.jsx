import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';    // optional
import App from './App';
import AboutUs from '/src/pages/AboutUs';
import Login from '/src/pages/Login';
import Register from '/src/pages/Register';
import Profile from '/src/pages/Profile';
import { AuthProvider } from './lib/auth';
import ProtectedRoute from './components/ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Home route: "/" */}
          <Route path="/" element={<App />} />

          {/* About route: "/about" */}
          <Route path="/about" element={<AboutUs />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);