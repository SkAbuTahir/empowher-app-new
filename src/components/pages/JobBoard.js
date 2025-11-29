'use client';

import { useState } from 'react';
import { Search, MapPin, DollarSign, Briefcase, X } from 'lucide-react';

const JobCard = ({ job, onApply }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
    <div>
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{job.title}</h3>
      <p className="text-gray-600 font-medium">{job.company}</p>
      <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><MapPin size={14} className="mr-1"/> {job.location}</span>
        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><Briefcase size={14} className="mr-1"/> {job.type}</span>
        <span className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full"><DollarSign size={14} className="mr-1"/> {job.salary}</span>
      </div>
    </div>
    <button onClick={() => onApply(job)} className="bg-teal-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-teal-600 transition shadow-sm whitespace-nowrap">
      Apply Now
    </button>
  </div>
);

const JobModal = ({ job, onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
    <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl">
      <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
      <h3 className="font-bold text-2xl mb-1">Apply to {job.company}</h3>
      <p className="text-purple-600 font-medium mb-6">{job.title}</p>
      
      <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm text-gray-600">
        <h4 className="font-bold text-gray-800 mb-2">Job Description</h4>
        <p>{job.description}</p>
      </div>

      <p className="text-gray-600 mb-6 text-center">To apply, please send your resume and portfolio to:</p>
      <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl text-center font-mono text-purple-700 font-bold mb-6 select-all">
        careers@{job.company.replace(/\s+/g, '').toLowerCase()}.com
      </div>
      
      <button onClick={onClose} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">Close</button>
    </div>
  </div>
);

export default function JobBoard({ jobs, loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [applyingJob, setApplyingJob] = useState(null);

  const filtered = jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Explore Opportunities</h2>
        <p className="text-gray-500 mt-2">Find a role that fits your life.</p>
        <div className="max-w-xl mx-auto mt-6 relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by job title or company..." 
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>
      ) : (
        <div className="grid gap-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No jobs found matching your search.</p>
            </div>
          ) : (
            filtered.map(job => (
              <JobCard key={job.id} job={job} onApply={setApplyingJob} />
            ))
          )}
        </div>
      )}

      {applyingJob && (
        <JobModal job={applyingJob} onClose={() => setApplyingJob(null)} />
      )}
    </div>
  );
}