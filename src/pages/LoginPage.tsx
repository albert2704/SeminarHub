
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes only
    if (email === 'admin@example.com' && password === 'password') {
      // Navigate to admin dashboard
      navigate('/admin');
    } else if (email === 'moderator@example.com' && password === 'password') {
      // Navigate to moderator dashboard
      navigate('/moderator');
    } else {
      // Navigate to home page as regular user
      navigate('/');
    }
  };
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5 col-xl-4">
          <div className="text-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#6c5ce7" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            <h1 className="h4 mt-3">Log in to SeminarHub</h1>
            <p className="text-muted">Access your account to manage seminars</p>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="password" className="form-label">Password</label>
                    <a href="#" className="text-decoration-none small">Forgot password?</a>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Log In</button>
              </form>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="mb-0">
              Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link>
            </p>
            
            <div className="mt-4 small text-muted">
              <p>For demo purposes:</p>
              <p className="mb-1">Admin: admin@example.com / password</p>
              <p className="mb-0">Moderator: moderator@example.com / password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
