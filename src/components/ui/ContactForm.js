'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.target);
    formData.append("access_key", "195725f0-3a18-4f09-a0dc-d6921f302cd3"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST", body: formData
      });
      const result = await response.json();
      if (result.success) setFormStatus('success');
      else setFormStatus('idle');
    } catch (error) {
      console.error("Error:", error);
      setFormStatus('idle');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="text-center py-10 bg-green-50 rounded-xl">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800">Message Sent!</h3>
        <button onClick={() => setFormStatus('idle')} className="mt-4 text-purple-600 font-medium">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleContactSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input required name="name" type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input required name="email" type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea required name="message" rows="4" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"></textarea>
      </div>
      <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg flex justify-center items-center">
        {formStatus === 'submitting' ? 'Sending...' : <><Send size={18} className="mr-2" /> Send Message</>}
      </button>
    </form>
  );
}