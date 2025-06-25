import React from 'react';
import GlobalIntro from '../components/GlobalIntro';
import TopButton from '../components/TopButton';
import GlobalTopSitesBubbles from '../components/Analysis/GlobalTopSites';


const GlobalPage = () => {
  return (
    <div className="relative">
      <GlobalIntro />
      <TopButton />
      {/* 본문 컨텐츠 */}
      <section className="min-h-screen pt-[100vh] px-8 py-5">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            다른 사람들은 어디를 많이 방문할까요?
          </h2>
          <GlobalTopSitesBubbles />
      </section>
    </div>
  );
};

export default GlobalPage;
