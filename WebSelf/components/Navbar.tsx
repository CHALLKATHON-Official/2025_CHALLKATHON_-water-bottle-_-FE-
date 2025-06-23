import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 px-6 py-3 bg-white shadow
        transform transition-all duration-500
        ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
      `}
    >
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* 왼쪽 로고 */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/WebSelf_logo_nobg.png" alt="WebSelf Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">WebSelf</span>
        </Link>

        {/* 오른쪽 버튼들 */}
        <div className="flex items-center space-x-4 text-sm">
          {/* 🔍 글로벌 분석 보기 버튼 */}
          <Link to="/global-analysis">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition">
              🌍 글로벌 사용자 분석 보기
            </button>
          </Link>
          {/* ✅ 확장 다운로드 버튼 */}
          <Link to="/download">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition">
              크롬 확장 다운로드
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
