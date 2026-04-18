import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Users, TrendingUp, Plus } from 'lucide-react';
import api from '../api/axiosInstance'; // Yeh check kar lena ke path sahi ho

// StatCard component
const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const [requests, setRequests] = useState([]);

  // Backend se data fetch karne ke liye
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/requests'); // Backend route
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Saad!</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-all">
          <Plus size={18} /> New Request
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Active Requests" value={requests.length} icon={<LayoutDashboard size={20}/>} color="bg-blue-50 text-blue-600" />
        <StatCard title="Trust Score" value="98%" icon={<TrendingUp size={20}/>} color="bg-green-50 text-green-600" />
        <StatCard title="Total Contributions" value="45" icon={<Users size={20}/>} color="bg-purple-50 text-purple-600" />
      </div>

      {/* Main Content Area (Dynamic Feed) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-lg font-semibold mb-6">Recent Requests</h2>
        
        <div className="space-y-4">
          {/* Yahan hum backend se aaya hua data render kar rahe hain */}
          {requests.length > 0 ? (
            requests.map((req: any) => (
              <div key={req._id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <h4 className="font-medium text-gray-900">{req.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{req.description}</p>
                <div className="mt-2 text-xs font-bold text-indigo-600">
                    Status: {req.status || 'Open'}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">No requests found yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;