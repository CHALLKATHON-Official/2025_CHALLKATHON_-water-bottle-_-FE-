import React from 'react';
import GlobalIntro from '../components/GlobalIntro';
import TopButton from '../components/TopButton';

const GlobalPage = () => {
  return (
    <div className="relative">
      <GlobalIntro />
      <TopButton />
      {/* 본문 컨텐츠 */}
      <section className="min-h-screen pt-[100vh] px-8 py-20">
        <h2 className="text-2xl text-blue-800 font-bold mb-6">전 세계 사용자 TOP 사이트</h2>
        {/* 추후 차트나 리스트 들어갈 자리 */}
      </section>
    </div>
  );
};

export default GlobalPage;
