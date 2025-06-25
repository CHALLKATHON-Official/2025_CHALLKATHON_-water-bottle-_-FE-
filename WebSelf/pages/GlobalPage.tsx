import React from 'react';
import GlobalIntro from '../components/GlobalIntro';
import TopButton from '../components/TopButton';
import GlobalTopSitesBubbles from '../components/Analysis/GlobalTopSites';
import GlobalCategoryPieChart from '../components/Analysis/GlobalCategoryPieChart'; // 추가
import GlobalUsagePieChart from '../components/Analysis/GlobalUsagePieChart';
import GlobalPageIntro from '../components/GlobalPageIntro';


const GlobalPage = () => {
  return (
    <div className="relative">
      <GlobalIntro />
      <TopButton />
      {/* 인트로 영역 */}
      <section className="min-h-screen pt-[30vh] px-8 py-5">
        <GlobalPageIntro />
        {/* 본문 컨텐츠 */}
        {/* top site bubble */}
        <div className="mb-100 mt-100 fade-in-on-scroll">
          <GlobalTopSitesBubbles />
        </div>
        {/* 전체 사이트 원 그래프 */}
        <div className="mb-100 mt-100 fade-in-on-scroll">
          <GlobalUsagePieChart />
        </div>
        {/* 카테고리별 분류 */}
        <div className="mb-100 mt-100 fade-in-on-scroll">
          <GlobalCategoryPieChart />
        </div>
      </section>
    </div>
  );
};

export default GlobalPage;
