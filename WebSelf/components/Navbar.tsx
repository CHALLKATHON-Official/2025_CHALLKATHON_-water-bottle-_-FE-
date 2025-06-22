import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 왼쪽: 로고 */}
        <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
          <img src='../public/WebSelf_Logo_nobg.png' alt="WebSelf Logo" className="h-15 w-15"/>
          <span> WebSelf </span>
        </Link>

        {/* 오른쪽: 분석 페이지 버튼 */}
        <nav className="space-x-4">
          <Link to="/analysis1" className="text-gray-700 hover:text-blue-600">
            분석 1
          </Link>
          <Link to="/analysis2" className="text-gray-700 hover:text-blue-600">
            분석 2
          </Link>
          <Link to="/analysis3" className="text-gray-700 hover:text-blue-600">
            분석 3
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
