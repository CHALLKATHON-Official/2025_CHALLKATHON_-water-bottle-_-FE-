import { useEffect } from 'react';
import TopButton from '../components/TopButton';
import GlobalCategoryPieChart from '../components/Analysis/GlobalCategoryPieChart';
import GlobalUsagePieChart from '../components/Analysis/GlobalUsagePieChart';
import GlobalTop8BubbleChart from '../components/Analysis/GlobalTop8BubbleChart';
import GlobalIntro from './../components/GlobalIntro';
import GlobalSearchIntro from '../components/GlobalSearchIntro';

const GlobalPage = () => {
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-in-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeEls.forEach((el) => observer.observe(el));

    return () => {
      fadeEls.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <GlobalIntro />
      <TopButton />
      {/* 인트로 영역 */}
      <section className="min-h-screen h-auto pt-[30vh] px-8 py-5">
        <div className="mb-130">
          <GlobalSearchIntro />
        </div>
        {/* top site bubble 그래프 */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 tracking-tight leading-snug mb-4 fade-in-on-scroll">전 세계에서 가장 핫한 사이트가 무엇일까요?</h1>
        <div className="mb-200 mt-5 fade-in-on-scroll">
          <GlobalTop8BubbleChart />
        </div>
        {/* 전체 사이트 원 그래프 */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 tracking-tight leading-snug mb-4 fade-in-on-scroll">전 세계 사람들은 어떤 사이트를 가장 많이 쓸까?</h1>
        <div className="mb-80 mt-5 fade-in-on-scroll">
          <GlobalUsagePieChart />
        </div>
        {/* 유형별 원 그래프 */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 tracking-tight leading-snug mb-4 fade-in-on-scroll">다른 사람들이 좋아하는 유형을 확인해보아요!</h1>
        <div className="mb-80 mt-5 fade-in-on-scroll">
          <GlobalCategoryPieChart />
        </div>
      </section>
    </div>
  );
};

export default GlobalPage;
