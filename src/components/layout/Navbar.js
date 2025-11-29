'use client';

import { useState } from 'react';
import { Menu, X, ShieldCheck, LogOut } from 'lucide-react';

const NAV_ITEMS = {
  woman: [
    { name: 'Home', value: 'home' },
    { name: 'Find Jobs', value: 'jobs' },
    { name: 'Upskill Courses', value: 'courses' },
    { name: 'Contact Us', value: 'contact' },
  ],
  company: [
    { name: 'Home', value: 'home' },
    { name: 'Post a Job', value: 'post-job' },
    { name: 'Verify Company', value: 'verify' },
    { name: 'Contact Us', value: 'contact' },
  ],
  admin: [
    { name: 'Dashboard', value: 'home' },
  ]
};

const ROLE_LABELS = {
  woman: 'Seeker',
  company: 'Employer',
  admin: 'Admin'
};

export default function Navbar({ setPage, currentPage, userRole, companyStatus, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = NAV_ITEMS[userRole] || [];
  const roleLabel = ROLE_LABELS[userRole] || '';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <span className="text-2xl font-bold text-purple-700">Empow<span className="text-teal-500">Her</span></span>
            <div className="ml-3 flex items-center gap-2">
              <span className={`px-3 py-1 bg-gray-100 text-xs rounded-full font-bold uppercase tracking-wide ${userRole === 'admin' ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}>
                {roleLabel}
              </span>
              {userRole === 'company' && companyStatus === 'verified' && (
                 <span className="flex items-center text-teal-600 text-xs font-bold" title="Verified Account">
                   <ShieldCheck size={16} /> <span className="hidden md:inline ml-1">Verified</span>
                 </span>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setPage(item.value)}
                className={`${currentPage === item.value ? 'text-purple-700 font-bold' : 'text-gray-500 hover:text-purple-600'} px-3 py-2 text-sm transition-colors`}
              >
                {item.name}
              </button>
            ))}
            <button onClick={onLogout} className="text-red-500 hover:text-red-700 text-sm font-medium ml-4 flex items-center gap-1">
              <LogOut size={16}/> Sign Out
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-purple-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-2">
          {navItems.map((item) => (
            <button 
              key={item.value} 
              onClick={() => { setPage(item.value); setIsOpen(false); }} 
              className="block w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 text-gray-700 font-medium"
            >
              {item.name}
            </button>
          ))}
          <button onClick={onLogout} className="block w-full text-left px-4 py-3 text-red-600 font-medium">Sign Out</button>
        </div>
      )}
    </nav>
  );
}