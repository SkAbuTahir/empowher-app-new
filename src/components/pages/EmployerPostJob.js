'use client';

import { useState } from 'react';
import { Briefcase, Lock, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db, appId } from '@/lib/firebase';

const VerificationRequired = ({ setPage, companyStatus }) => (
  <div className="max-w-3xl mx-auto px-4 py-20 animate-fadeIn">
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center p-12 border border-gray-200">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Lock className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Verification Required</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        To ensure the safety of our candidates, only verified companies can post job listings.
      </p>
      <div className="flex justify-center gap-4 flex-col md:flex-row">
         <button 
          onClick={() => setPage('verify')} 
          className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 transition flex items-center justify-center gap-2"
        >
          <ShieldCheck size={20} /> Go to Verification Page
        </button>
        {companyStatus === 'pending' && (
           <div className="flex items-center text-yellow-600 bg-yellow-50 px-6 py-3 rounded-xl font-medium">
              <AlertTriangle size={20} className="mr-2"/> Verification Pending...
           </div>
        )}
      </div>
    </div>
  </div>
);

const JobForm = ({ formData, setFormData, onSubmit, status }) => (
  <form onSubmit={onSubmit} className="p-8 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="label">Job Title</label>
        <input 
          required 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          type="text" 
          className="input-field" 
          placeholder="e.g. Senior Frontend Dev" 
        />
      </div>
      <div>
        <label className="label">Company Name</label>
        <input 
          required 
          value={formData.company} 
          onChange={e => setFormData({...formData, company: e.target.value})} 
          type="text" 
          className="input-field" 
          placeholder="e.g. TechCorp" 
        />
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="label">Type</label>
        <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="input-field">
          <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Freelance</option>
        </select>
      </div>
      <div>
        <label className="label">Location</label>
        <select value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="input-field">
          <option>Remote</option><option>Hybrid</option><option>On-Site</option>
        </select>
      </div>
      <div>
        <label className="label">Salary</label>
        <input 
          value={formData.salary} 
          onChange={e => setFormData({...formData, salary: e.target.value})} 
          type="text" 
          className="input-field" 
          placeholder="$60k - $80k" 
        />
      </div>
    </div>

    <div>
      <label className="label">Required Skills</label>
      <input 
        required 
        value={formData.skills} 
        onChange={e => setFormData({...formData, skills: e.target.value})} 
        type="text" 
        className="input-field" 
        placeholder="e.g. React, Node.js, Design" 
      />
    </div>

    <div>
      <label className="label">Description</label>
      <textarea 
        required 
        value={formData.description} 
        onChange={e => setFormData({...formData, description: e.target.value})} 
        rows="5" 
        className="input-field"
      ></textarea>
    </div>

    <button type="submit" disabled={status === 'loading'} className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition">
      {status === 'loading' ? 'Posting...' : 'Publish Job'}
    </button>
  </form>
);

export default function EmployerPostJob({ setPage, user, companyStatus }) {
  const [formData, setFormData] = useState({
    title: '', company: '', location: 'Remote', type: 'Full-time', salary: '', skills: '', description: ''
  });
  const [status, setStatus] = useState('idle');

  if (companyStatus !== 'verified') {
    return <VerificationRequired setPage={setPage} companyStatus={companyStatus} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setStatus('loading');
    
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'jobs'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setStatus('success');
      setFormData({ title: '', company: '', location: 'Remote', type: 'Full-time', salary: '', skills: '', description: '' });
      setTimeout(() => { setStatus('idle'); setPage('home'); }, 2000);
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-purple-900 p-8 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Briefcase size={24}/> Post a New Role</h2>
          <p className="text-purple-200 mt-2">Reach thousands of qualified candidates.</p>
        </div>
        
        {status === 'success' ? (
          <div className="p-16 text-center">
             <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-bounce" />
             <h3 className="text-2xl font-bold text-gray-800">Job Posted!</h3>
             <p className="text-gray-500">Redirecting...</p>
          </div>
        ) : (
          <JobForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleSubmit} 
            status={status} 
          />
        )}
      </div>
    </div>
  );
}