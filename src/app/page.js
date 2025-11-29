'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useJobs, useCompanyStatus } from '@/hooks/useFirestore';

// Components
import LoginSelection from '@/components/auth/LoginSelection';
import Navbar from '@/components/layout/Navbar';
import HomePage from '@/components/pages/HomePage';
import JobBoard from '@/components/pages/JobBoard';

// Dynamic imports for better performance
const AdminDashboard = dynamic(() => import('@/components/pages/AdminDashboard'), { ssr: false });
const EmployerPostJob = dynamic(() => import('@/components/pages/EmployerPostJob'), { ssr: false });
const EmployerVerification = dynamic(() => import('@/components/pages/EmployerVerification'), { ssr: false });
const Courses = dynamic(() => import('@/components/pages/Courses'), { ssr: false });
const ContactPage = dynamic(() => import('@/components/pages/ContactPage'), { ssr: false });

export default function Home() {
  const { user, userRole, login, logout } = useAuth();
  const { jobs, loading: jobsLoading } = useJobs();
  const companyStatus = useCompanyStatus(user, userRole);
  const [currentPage, setCurrentPage] = useState('home');

  const handleLogin = useCallback((role) => {
    login(role);
    setCurrentPage('home');
  }, [login]);

  const handleLogout = useCallback(() => {
    logout();
    setCurrentPage('home');
  }, [logout]);

  const renderPage = useMemo(() => {
    const pageProps = { userRole, setPage: setCurrentPage, user, companyStatus };
    
    switch(currentPage) {
      case 'home': 
        if (userRole === 'admin') return <AdminDashboard />;
        return <HomePage {...pageProps} />;
      
      case 'jobs': 
        return userRole === 'woman' ? <JobBoard jobs={jobs} loading={jobsLoading} /> : <HomePage {...pageProps} />;
      
      case 'courses': 
        return userRole === 'woman' ? <Courses /> : <HomePage {...pageProps} />;
      
      case 'post-job': 
        return userRole === 'company' ? <EmployerPostJob {...pageProps} /> : <HomePage {...pageProps} />;
      
      case 'verify': 
        return userRole === 'company' ? <EmployerVerification {...pageProps} /> : <HomePage {...pageProps} />;
      
      case 'contact': 
        return <ContactPage />;
      
      default: 
        return <HomePage {...pageProps} />;
    }
  }, [currentPage, userRole, user, companyStatus, jobs, jobsLoading]);

  if (!userRole) {
    return <LoginSelection onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar 
        setPage={setCurrentPage} 
        currentPage={currentPage} 
        userRole={userRole} 
        companyStatus={companyStatus} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow">
        {renderPage}
      </main>
      
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-2xl font-bold mb-4 block text-purple-900">Empow<span className="text-teal-500">Her</span></span>
          <p className="text-gray-400">© 2025 EmpowHer. All rights reserved.</p>
        </div>
      </footer>

      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: #9333ea;
          box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
        }
        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}