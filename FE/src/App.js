// src/App.js
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Import Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage'; // New public home
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'; // Renamed from HomePage

// Import Global CSS
import './App.css';

// Private Route HOC (Higher Order Component)
function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token');
  // If no token, redirect to login, preserving the intended destination
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container"> {/* Optional: For global layout */}
        <Header />

        <main className="main-content"> {/* Optional: For content area styling */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} /> {/* Public Landing Page */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Route */}
            <Route
              path="/dashboard" // Main app view after login
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

             {/* Optional: Catch-all or 404 route */}
             <Route path="*" element={<Navigate to="/" replace />} />
             {/* Or <Route path="*" element={<NotFoundPage />} /> */}

          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}