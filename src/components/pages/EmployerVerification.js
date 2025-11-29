'use client';

import { useState } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { setDoc, doc } from 'firebase/firestore';
import { db, appId } from '@/lib/firebase';

const VerifiedStatus = () => (
  <div className="max-w-2xl mx-auto px-4 py-12 animate-fadeIn">
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center p-12">
      <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldCheck className="w-12 h-12 text-teal-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">You are Verified!</h2>
      <p className="text-gray-600 mb-8">Your documents have been approved. You can now post jobs.</p>
      <button className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg opacity-50 cursor-not-allowed">
        Verification Complete
      </button>
    </div>
  </div>
);

const PendingStatus = () => (
  <div className="max-w-2xl mx-auto px-4 py-12 animate-fadeIn">
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center p-12 border border-yellow-200">
      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <AlertTriangle className="w-10 h-10 text-yellow-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800">Verification Pending</h3>
      <p className="text-gray-600 mt-2">Our admin team is reviewing your documents.</p>
      <p className="text-sm text-gray-500 mt-4">You will be automatically approved here once verified.</p>
    </div>
  </div>
);

const VerificationForm = ({ formData, setFormData, onSubmit, loading }) => (
  <form onSubmit={onSubmit} className="p-8 space-y-6">
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            You must complete this verification before you can post any jobs.
          </p>
        </div>
      </div>
    </div>

    <div>
      <label className="label">Company Registration Number (EIN/CIN)</label>
      <input 
        required 
        value={formData.regNumber} 
        onChange={e => setFormData({...formData, regNumber: e.target.value})} 
        type="text" 
        className="input-field" 
        placeholder="XX-XXXXXXX" 
      />
    </div>
    <div>
      <label className="label">Official Website</label>
      <input 
        required 
        value={formData.website} 
        onChange={e => setFormData({...formData, website: e.target.value})} 
        type="url" 
        className="input-field" 
        placeholder="https://company.com" 
      />
    </div>
    <div>
      <label className="label">LinkedIn Company Page</label>
      <input 
        value={formData.linkedin} 
        onChange={e => setFormData({...formData, linkedin: e.target.value})} 
        type="url" 
        className="input-field" 
        placeholder="https://linkedin.com/company/..." 
      />
    </div>
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:bg-gray-50 transition cursor-pointer">
      <p className="text-gray-500 font-medium">Upload Business License or Certificate of Incorporation</p>
      <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (Max 5MB)</p>
    </div>
    <button type="submit" className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition">
      Submit for Verification
    </button>
  </form>
);

export default function EmployerVerification({ companyStatus, user }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    regNumber: '', website: '', linkedin: ''
  });

  if (companyStatus === 'verified') {
    return <VerifiedStatus />;
  }

  if (companyStatus === 'pending') {
    return <PendingStatus />;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'companies', user.uid), {
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setLoading(false);
    } catch (error) {
      console.error("Error submitting verification:", error);
      alert("Submission failed.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-teal-600 p-8 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldCheck size={28}/> Company Verification</h2>
          <p className="text-teal-100 mt-2">Verified badges increase applicant trust by 80%.</p>
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-gray-800">Submitting Documents...</h3>
          </div>
        ) : (
          <VerificationForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleVerify} 
            loading={loading} 
          />
        )}
      </div>
    </div>
  );
}