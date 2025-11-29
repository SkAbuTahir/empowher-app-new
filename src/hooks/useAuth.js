'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check LocalStorage on Mount
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }
    
    // Listen for Auth State
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  return {
    user,
    userRole,
    loading,
    login,
    logout
  };
}