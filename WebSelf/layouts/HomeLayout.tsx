import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Props {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 내비게이션 바 */}
      <Navbar />

      {/* 페이지별 본문 */}
      <main className="flex-1">
        {children}
      </main>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
