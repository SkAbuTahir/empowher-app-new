'use client';

import { useState } from 'react';
import { UserCircle, Building, UserCog, ArrowLeft } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const AUTH_ERRORS = {
  'auth/operation-not-allowed': "Email/Password auth not enabled in Firebase Console.",
  'auth/invalid-credential': "Invalid email or password.",
  'auth/email-already-in-use': "Email already in use. Try logging in.",
  'auth/weak-password': "Password should be at least 6 characters."
};

export default function LoginSelection({ onLogin }) {
  const [view, setView] = useState('selection');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchView = (newView) => {
    setView(newView);
    setError('');
    setEmail('');
    setPassword('');
    setAuthMode('login');
  };

  const handleAuth = async (e, userType) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (authMode === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin(userType);
    } catch (err) {
      setError(AUTH_ERRORS[err.code] || err.message);
    }
    setIsLoading(false);
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (adminCode === 'admin123') {
      setIsLoading(true);
      await onLogin('admin');
      setIsLoading(false);
    } else {
      setError('Invalid Access Code');
    }
  };

  const AuthForm = ({ userType, title, subtitle, buttonColor }) => (
    <div className="animate-fadeIn w-full">
      <button onClick={() => switchView('selection')} className="text-sm text-gray-500 mb-4 hover:underline flex items-center gap-1">
        <ArrowLeft size={14} /> Back to Roles
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
      
      <form onSubmit={(e) => handleAuth(e, userType)} className="space-y-4">
        <div>
          <label className="label text-gray-700">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field text-gray-900 bg-white" 
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="label text-gray-700">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field text-gray-900 bg-white" 
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</p>}
        
        <button type="submit" disabled={isLoading} className={`w-full ${buttonColor} text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg disabled:opacity-50`}>
          {isLoading ? 'Processing...' : (authMode === 'login' ? 'Login' : 'Create Account')}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        {authMode === 'login' ? (
          <p className="text-gray-600">
            New here? <button onClick={() => { setAuthMode('register'); setError(''); }} className={`${userType === 'woman' ? 'text-purple-600' : 'text-teal-600'} font-bold hover:underline`}>Create an account</button>
          </p>
        ) : (
          <p className="text-gray-600">
            Already have an account? <button onClick={() => { setAuthMode('login'); setError(''); }} className={`${userType === 'woman' ? 'text-purple-600' : 'text-teal-600'} font-bold hover:underline`}>Log in</button>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fadeIn relative min-h-[500px]">
        
        {/* Left Side: Branding */}
        <div className="md:w-1/2 bg-purple-700 p-12 text-white flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold mb-4">Empow<span className="text-teal-400">Her</span></h1>
          <p className="text-purple-100 text-lg mb-8">Bridging the gap for women in tech and remote work.</p>
          <div className="w-32 h-1 bg-teal-400 rounded-full"></div>
        </div>

        {/* Right Side: Dynamic Forms */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          
          {view === 'selection' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome</h2>
              <p className="text-center text-gray-500 mb-8 text-sm">Select your role to continue</p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => switchView('woman-auth')}
                  className="w-full group p-6 border-2 border-purple-100 rounded-2xl hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 flex items-center gap-4 text-left"
                >
                  <div className="bg-purple-100 p-4 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <UserCircle size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Woman / Job Seeker</h3>
                    <p className="text-sm text-gray-500">Find jobs, upskill, and grow.</p>
                  </div>
                </button>

                <button 
                  onClick={() => switchView('company-auth')}
                  className="w-full group p-6 border-2 border-teal-100 rounded-2xl hover:border-teal-600 hover:bg-teal-50 transition-all duration-300 flex items-center gap-4 text-left"
                >
                  <div className="bg-teal-100 p-4 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Building size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Company / Employer</h3>
                    <p className="text-sm text-gray-500">Post jobs and find talent.</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => switchView('admin')}
                  className="w-full mt-4 text-center text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1"
                >
                  <UserCog size={12} /> Admin Login
                </button>
              </div>
            </div>
          )}

          {view === 'woman-auth' && (
            <AuthForm 
              userType="woman" 
              title="Job Seeker Portal" 
              subtitle={authMode === 'login' ? 'Welcome back! Log in to apply.' : 'Create a profile to find jobs.'}
              buttonColor="bg-purple-600"
            />
          )}

          {view === 'company-auth' && (
            <AuthForm 
              userType="company" 
              title="Company Portal" 
              subtitle={authMode === 'login' ? 'Log in to manage your jobs.' : 'Register to verify your company.'}
              buttonColor="bg-teal-600"
            />
          )}

          {view === 'admin' && (
            <div className="animate-fadeIn w-full">
              <button onClick={() => switchView('selection')} className="text-sm text-gray-500 mb-4 hover:underline flex items-center gap-1">
                <ArrowLeft size={14} /> Back to Roles
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h2>
              <p className="text-sm text-gray-500 mb-6">Enter the verification code (admin123)</p>
              
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="label text-gray-700">Access Code</label>
                  <input 
                    type="password" 
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    className="input-field text-gray-900 bg-white" 
                    placeholder="Enter code"
                    autoFocus
                    autoComplete="off"
                  />
                </div>
                {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</p>}
                <button type="submit" disabled={isLoading} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition shadow-lg disabled:opacity-50">
                  {isLoading ? 'Verifying...' : 'Enter Dashboard'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}