'use client';

import { MapPin, Send } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-purple-900 p-8 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Let's Talk</h2>
          <p className="text-purple-200 mb-8">Have questions about posting a job or finding one? We're here to help.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3"><MapPin className="text-teal-400"/> 123 Tech Avenue, NY</div>
            <div className="flex items-center gap-3"><Send className="text-teal-400"/> support@empowher.com</div>
          </div>
        </div>
        <div className="md:w-2/3 p-8 md:p-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}