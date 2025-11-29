'use client';

import { CheckCircle, Check } from 'lucide-react';
import { updateDoc, doc } from 'firebase/firestore';
import { db, appId } from '@/lib/firebase';
import { usePendingCompanies } from '@/hooks/useFirestore';

const CompanyCard = ({ company, onVerify }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
    <div className="flex-grow">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-xl font-bold text-gray-900">{company.website}</h3>
        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold uppercase">Pending</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
        <p><span className="font-semibold">Reg ID:</span> {company.regNumber}</p>
        <p><span className="font-semibold">Website:</span> <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{company.website}</a></p>
        <p><span className="font-semibold">LinkedIn:</span> {company.linkedin || 'N/A'}</p>
        <p><span className="font-semibold">Applied:</span> {new Date(company.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
    <div className="flex gap-3 w-full md:w-auto">
      <button 
        onClick={() => onVerify(company.id)}
        className="flex-1 md:flex-none bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
      >
        <Check size={18} /> Verify
      </button>
    </div>
  </div>
);

export default function AdminDashboard() {
  const { companies, loading } = usePendingCompanies();

  const handleVerify = async (companyId) => {
    try {
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'companies', companyId), {
        status: 'verified'
      });
    } catch (error) {
      console.error("Verification failed", error);
      alert("Verification failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold">
          {companies.length} Pending Request(s)
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading requests...</div>
      ) : companies.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-20 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">All Caught Up!</h2>
          <p className="text-gray-500 mt-2">No pending verification requests.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} onVerify={handleVerify} />
          ))}
        </div>
      )}
    </div>
  );
}