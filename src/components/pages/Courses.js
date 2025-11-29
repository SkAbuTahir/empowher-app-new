'use client';

import { COURSES } from '@/lib/constants';

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group cursor-pointer flex flex-col h-full">
    <div className="h-48 overflow-hidden">
      <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
      />
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">{course.category}</span>
        <span className="text-xs text-gray-500 font-medium">{course.duration}</span>
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 transition-colors">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">{course.description}</p>
      <button className="w-full mt-auto border-2 border-purple-100 text-purple-700 font-bold py-2 rounded-xl hover:bg-purple-600 hover:text-white transition-colors">
        Enroll Now
      </button>
    </div>
  </div>
);

export default function Courses() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Upskill & Grow</h2>
        <p className="text-gray-500 mt-2">Courses designed to get you hired.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {COURSES.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}