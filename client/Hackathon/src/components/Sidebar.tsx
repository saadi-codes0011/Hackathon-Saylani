import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass, PlusSquare, User } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-6 flex flex-col fixed">
      <h1 className="text-xl font-bold text-indigo-600 mb-10 tracking-tight">Helplytics AI</h1>
      <nav className="space-y-3 flex-1">
        <NavLink to="/" className={({isActive}) => `flex items-center gap-3 p-3 rounded-xl transition ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/explore" className={({isActive}) => `flex items-center gap-3 p-3 rounded-xl transition ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}>
          <Compass size={20} /> Explore
        </NavLink>
        <NavLink to="/create" className={({isActive}) => `flex items-center gap-3 p-3 rounded-xl transition ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}>
          <PlusSquare size={20} /> Create Request
        </NavLink>
      </nav>
      <div className="p-3 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3 text-gray-600">
          <User size={20} /> Profile
        </div>
      </div>
    </div>
  );
};

export default Sidebar;