import  { useEffect } from 'react';
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
        <GlobalSearchIntro />
        {/* top site bubble 그래프 */}
        <div className="mb-100 mt-50 fade-in-on-scroll">
          <GlobalTop8BubbleChart />
        </div>
        {/* 전체 사이트 원 그래프 */}
        <div className="mb-100 mt-50 fade-in-on-scroll">
          <GlobalUsagePieChart />
        </div>
        {/* 유형별 원 그래프 */}
        <div className="mb-100 mt-50 fade-in-on-scroll">
          <GlobalCategoryPieChart />
        </div>
      </section>
    </div>
  );
};

export default GlobalPage;
