import React, { useState } from 'react';
import { Send } from 'lucide-react';

const CreateRequest = () => {
  const [formData, setFormData] = useState({ title: '', description: '', category: 'MERN', urgency: 'Medium' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Yahan axios ka call lagega
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Request</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500" 
            placeholder="What do you need help with?" 
            onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea className="w-full p-3 rounded-xl border border-gray-200 h-32 outline-none focus:ring-2 focus:ring-indigo-500" 
            placeholder="Explain your problem in detail..."
            onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select className="w-full p-3 rounded-xl border border-gray-200" onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option>MERN</option>
              <option>UI/UX</option>
              <option>Backend</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Urgency</label>
            <select className="w-full p-3 rounded-xl border border-gray-200" onChange={(e) => setFormData({...formData, urgency: e.target.value})}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2">
          <Send size={18} /> Post Request
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;