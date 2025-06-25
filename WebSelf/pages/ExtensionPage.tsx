import React, { useEffect, useRef, useState } from 'react';
import PerDaysAnalysis from '../components/Analysis/PerDaysAnalysis';
import CircleGraphAnalysis from '../components/Analysis/CircleGraphAnalysis';
import ActivityChartAnalysis from '../components/Analysis/ActivityChartAnalysis';
import ClockActivityChart from '../components/Analysis/AnalysisHourlyActivity';
import CategoryPieChart from '../components/Analysis/SiteCategoryChart';
import TypingIntro from '../components/TypingIntro';
import TopButton from '../components/TopButton';


interface Props {
  userId: string;
}

const ExtensionHomePage = ({ userId }: Props) => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const [showArrow, setShowArrow] = useState(true);

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        setOpacity(0);
        setTranslateY(-50);
        setShowArrow(false);
      } else {
        setOpacity(1);
        setTranslateY(0);
        setShowArrow(true);
      }
    };

    const fadeEls = document.querySelectorAll('.fade-in-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeEls.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      fadeEls.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* 인트로 영역 */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative bg-gradient-to-b from-blue-100 to-white overflow-hidden">
        <div
          className="transition-all duration-500"
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          <img
            src="/WebSelf_logo_nobg.png"
            alt="WebSelf Logo"
            className="w-40 h-40 ml-33 animate-float"
          />
          <h1 className="text-6xl font-bold font-bungee text-blue-600 drop-shadow-lg">WebSelf</h1>
          <br />
          <h2 className="text-2xl text-blue-800 drop-shadow-lg">-웹 사용 습관 분석 페이지에 오신 것을-</h2>
          <br />
          <h2 className="text-4xl text-blue-800 drop-shadow-lg">- 환영합니다! -</h2>
        </div>
        {showArrow && (
          <div className="absolute bottom-10 animate-bounce text-gray-400 text-3xl">ˬ</div>
        )}
      </section>

      <section className="px-6 py-20 max-w-3xl mx-auto">
        {/* 분석 인트로 섹션 */}
        <section className="h-screen relative">
          <TypingIntro />
        </section>

        {/* 원형 그래프 분석 */}
        <div className="mb-100 mt-100 fade-in-on-scroll" ref={chartRef}>
          <PerDaysAnalysis userId={userId} />
        </div>
        {/* 막대 그래프 분석 */}
        <div className="grid md:grid-cols-3 mb-100 mt-100 gap-x-60 gap-y-8 justify-items-center mb-24 fade-in-on-scroll">
          <CircleGraphAnalysis userId={userId} period="7days" />
          <CircleGraphAnalysis userId={userId} period="30days" />
          <CircleGraphAnalysis userId={userId} period="90days" />
        </div>
        {/* 날짜별 차트 분석 */}
        <div className="mb-100 mt-100 fade-in-on-scroll">
        <ActivityChartAnalysis userId={userId} period="7days" />
        </div>
        {/* 시간별 원형 분석 */}
        <div className="mb-100 mt-100 fade-in-on-scroll">
        <ClockActivityChart userId={userId} period="7days" />
        </div>
        {/* 사이트 유형별 분석 */}
        <div className="mb-100 mt-100 fade-in-on-scroll">
          <CategoryPieChart userId={userId} period="7days" />
        </div>
      </section>

      {/* 맨 위로 버튼 */}
      <TopButton />
    </div>
  );
};

export default ExtensionHomePage;
