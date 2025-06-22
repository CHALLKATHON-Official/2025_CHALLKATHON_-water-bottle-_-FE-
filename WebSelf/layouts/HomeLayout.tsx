import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React from 'react';

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 내비게이션 바 */}
      <Navbar />

      {/* 페이지별 본문 */}
      <main className="flex-1">
        <Outlet /> {/* 여기서 자식 페이지가 렌더링됨 */}
      </main>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
