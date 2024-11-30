import React from 'react';
import { Link } from 'react-router-dom';

const HomeNav = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md h-16 flex items-center justify-between px-6">
      <div className="text-lg md:text-2xl font-semibold text-white tracking-wide">
        TaskManager<span className="font-light">Pro</span>
      </div>

      <div className="flex items-center gap-1 sm:gap-4 flex-wrap">
        <Link to="/signin">
          <button className="md:px-4 p-1 md:py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-indigo-100 transition duration-200">
            Sign In
          </button>
        </Link>
        <Link to="/signup">
          <button className="md:px-4 p-1 md:py-2 text-sm font-medium text-white bg-indigo-700 hidden sm:block rounded-md hover:bg-indigo-800 transition duration-200">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default HomeNav;
