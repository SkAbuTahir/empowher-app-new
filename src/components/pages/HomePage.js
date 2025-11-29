'use client';

import { Briefcase, Users, ShieldCheck } from 'lucide-react';
import { HERO_IMAGES, STATS } from '@/lib/constants';

const StatCard = ({ stat, icon: Icon }) => (
  <div className={`p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition ${stat.bgColor}`}>
    <Icon className="w-10 h-10 text-purple-600 mb-4" />
    <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
    <p className="text-gray-600">{stat.description}</p>
  </div>
);

export default function HomePage({ userRole, setPage }) {
  const isWoman = userRole === 'woman';
  
  return (
    <div className="animate-fadeIn">
      <div className="bg-gradient-to-r from-purple-50 to-teal-50 py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <span className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              {isWoman ? 'For Job Seekers' : 'For Employers'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {isWoman 
                ? <span>Shape Your Future with <span className="text-purple-600">Flexible Work</span></span>
                : <span>Find Diverse Talent & <span className="text-purple-600">Boost Growth</span></span>
              }
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              {isWoman
                ? "Join thousands of women finding financial independence through verified remote jobs and skill development."
                : "Connect with skilled, motivated women ready to contribute to your company's success remotely."
              }
            </p>
            <button 
              onClick={() => setPage(isWoman ? 'jobs' : 'post-job')} 
              className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-700 shadow-xl transition transform hover:-translate-y-1"
            >
              {isWoman ? 'Browse Jobs' : 'Post a Job Now'}
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src={HERO_IMAGES[userRole]} 
              alt="Hero" 
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover h-96 relative z-10" 
            />
          </div>
        </div>
      </div>

      {/* Stats / Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard stat={STATS[0]} icon={Briefcase} />
          <StatCard stat={STATS[1]} icon={Users} />
          <StatCard stat={STATS[2]} icon={ShieldCheck} />
        </div>
      </div>
    </div>
  );
}