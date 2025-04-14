
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  userRole?: 'user' | 'moderator' | 'admin' | null;
}

const Navbar: React.FC<NavbarProps> = ({ userRole }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#8B5CF6" viewBox="0 0 24 24">
            <path d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
          </svg>
          <span className="ms-1">SeminarHub</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/seminars">Browse Seminars</Link>
            </li>
            {userRole === 'moderator' && (
              <li className="nav-item">
                <Link className="nav-link" to="/moderator">Moderator Dashboard</Link>
              </li>
            )}
            {userRole === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              </li>
            )}
          </ul>
          
          <div className="d-flex">
            {userRole ? (
              <Link to="/login" className="btn btn-outline-primary me-2">
                <i className="bi bi-person me-1"></i> Profile
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                  <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
                <span className="ms-1">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
