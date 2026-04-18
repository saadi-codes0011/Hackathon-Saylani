import React from 'react';
import { Search, Filter } from 'lucide-react';

const Explore = () => {
  return (
    <div className="p-8">
      {/* Header & Filter */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Explore Requests</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input className="pl-10 pr-4 py-2 rounded-xl border border-gray-200" placeholder="Search requests..." />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      {/* Feed Area */}
      <div className="space-y-4">
        {/* Mock Card - Yahan .map() use hoga backend data ke liye */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg">Help with React Context API</h3>
              <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">HIGH URGENCY</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm">Need help implementing global state management for my dashboard...</p>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-md font-medium">React</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-md font-medium">Frontend</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;