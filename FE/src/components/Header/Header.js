// src/components/Header/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import CSS

export default function Header() {
  const navigate = useNavigate();
  // Use state to react to login changes
  const [username, setUsername] = useState(localStorage.getItem('username'));

  // Optional: Listen for storage changes to update header immediately
  // if login/logout happens in another tab (more advanced).
  // For simplicity, we'll rely on page navigation triggering re-renders.

   // Update username state if localStorage changes (e.g., after login/logout)
   // This is a simple way; more robust solutions might use Context API or state management libraries
   useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem('username'));
    };

    // Set initial state
    setUsername(localStorage.getItem('username'));

    // Listen for custom event dispatched on login/logout if needed for instant update
    window.addEventListener('authChange', handleStorageChange);

    // Basic check on mount/navigation
    // window.addEventListener('storage', handleStorageChange); // Can be unreliable across tabs

    return () => {
      window.removeEventListener('authChange', handleStorageChange);
      // window.removeEventListener('storage', handleStorageChange);
    };
   }, []);


  const handleLogout = () => {
    // Remove tokens + user info
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');

    // Dispatch a custom event to notify other components (like Header) instantly
    window.dispatchEvent(new CustomEvent('authChange'));

    // Navigate to the public landing page after logout
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="logo-container">
        {/* You can put a logo here */}
        <Link to="/" className="logo-link">SpotifyClone</Link>
      </div>
      <nav className="navigation">
        <Link to="/" className="nav-link">Home</Link> {/* Always points to public landing */}

        {username ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link> {/* Link to protected area */}
            {/* Add other authenticated links here if needed */}
          </>
        ) : (
          <>
            {/* Maybe hide Home if on Home? */}
          </>
        )}
      </nav>
      <div className="user-actions">
        {username ? (
          <>
            <span className="welcome-message">Welcome, <strong>{username}</strong>!</span>
            <button onClick={handleLogout} className="btn btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/register" className="btn btn-register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}