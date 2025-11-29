'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, doc } from 'firebase/firestore';
import { db, appId } from '@/lib/firebase';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, 'artifacts', appId, 'public', 'data', 'jobs');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      jobList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setJobs(jobList);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { jobs, loading };
}

export function useCompanyStatus(user, userRole) {
  const [companyStatus, setCompanyStatus] = useState('unverified');

  useEffect(() => {
    if (!user || userRole !== 'company') return;

    const unsub = onSnapshot(doc(db, 'artifacts', appId, 'public', 'data', 'companies', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCompanyStatus(data.status);
      } else {
        setCompanyStatus('unverified');
      }
    });

    return unsub;
  }, [user, userRole]);

  return companyStatus;
}

export function usePendingCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'artifacts', appId, 'public', 'data', 'companies'),
      where('status', '==', 'pending')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompanies(list);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  return { companies, loading };
}