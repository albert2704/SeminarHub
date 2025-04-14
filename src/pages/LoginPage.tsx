
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#8B5CF6" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Log in to SeminarHub</h1>
          <p className="text-gray-600">Access your account to manage seminars</p>
        </div>
        
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-center text-purple-800">Welcome Back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Link to="#" className="text-sm text-purple-600 hover:text-purple-800">Forgot password?</Link>
                </div>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Log In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center border-t border-purple-50 pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Don't have an account? <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-medium">Sign up</Link>
            </p>
            
            <div className="text-xs text-gray-500">
              <p>For demo purposes:</p>
              <p className="mb-1">Admin: admin@example.com / password</p>
              <p className="mb-0">Moderator: moderator@example.com / password</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
