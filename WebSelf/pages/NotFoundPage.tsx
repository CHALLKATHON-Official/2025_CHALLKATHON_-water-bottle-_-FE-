import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-white to-blue-100 text-blue-800"
      style={{ fontFamily: `'Bungee', sans-serif` }}
    >
      <h1 className="text-7xl font-bold mb-4 drop-shadow-lg">! 404 !</h1><br/>
      <h2 className="text-3xl mb-2 drop-shadow-sm">Page not founds</h2>
      <p className="text-lg mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <button className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 shadow-md transition-all">
          Go home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
