import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
/* Removed import of non-existent AuthPage.css since styles are in index.css */

const AuthPage = () => {
  return (
    <div className="auth-container" style={{ justifyContent: 'center' }}>
      <div className="auth-right-panel" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="auth-login-card">
          <div className="auth-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 14H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zM3.14 6l1.25 6h7.22l1.25-6H3.14z" />
              <path d="M5.5 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <span className="auth-logo-text">E-STORE</span>
          </div>
          <Login />
          <div className="auth-forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
