// src/components/LandingPage/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import CSS

export default function LandingPage() {
  return (
    <div className="landing-container">
      <section className="hero-section">
        <h1>Welcome to Your Spotify Clone</h1>
        <p>Listen to your favorite music and videos, anywhere, anytime.</p>
        <div className="cta-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Sign Up Now</Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        {/* Add more descriptive content or images here */}
        <ul>
          <li>Stream unlimited music</li>
          <li>Watch music videos</li>
          <li>Create custom albums</li>
          <li>Chat with others</li>
        </ul>
      </section>
    </div>
  );
}