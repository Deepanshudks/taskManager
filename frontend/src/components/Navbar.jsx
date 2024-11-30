import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="w-full bg-white shadow-lg h-16 flex items-center justify-between px-6">
      <div className="text-2xl font-semibold text-blue-600 tracking-wide">
        TaskManager<span className="text-gray-700">Pro</span>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/tasks">
          <span className="text-gray-600 hover:text-blue-600 font-medium transition duration-200 cursor-pointer">
            Dashboard
          </span>
        </Link>
        <Link to="/createtask">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200">
            Add Task
          </button>
        </Link>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
