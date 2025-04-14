
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import SeminarListPage from './pages/SeminarListPage';
import SeminarDetailPage from './pages/SeminarDetailPage';
import SeminarFormPage from './pages/SeminarFormPage';
import ModeratorDashboardPage from './pages/ModeratorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<'user' | 'moderator' | 'admin' | null>(null);
  
  // Simulating checking for user role on app load
  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName.includes('/admin')) {
      setUserRole('admin');
    } else if (pathName.includes('/moderator')) {
      setUserRole('moderator');
    } else if (pathName === '/login') {
      setUserRole(null);
    } else {
      setUserRole('user');
    }
  }, []);

  return (
    <>
      <Navbar userRole={userRole} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seminars" element={<SeminarListPage />} />
          <Route path="/seminars/:id" element={<SeminarDetailPage />} />
          
          {/* Moderator routes */}
          <Route path="/moderator" element={<ModeratorDashboardPage />} />
          <Route path="/seminars/new" element={<SeminarFormPage />} />
          <Route path="/seminars/:id/edit" element={<SeminarFormPage />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          
          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
