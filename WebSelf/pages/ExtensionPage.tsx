import React, { useEffect, useRef, useState } from 'react';
import PerDaysAnalysis from '../components/Analysis/PerDaysAnalysis';
import CircleGraphAnalysis from '../components/Analysis/CircleGraphAnalysis';

import ActivityChartAnalysis from '../components/Analysis/ActivityChartAnalysis';
<<<<<<< HEAD
import { FaArrowUp } from 'react-icons/fa'; // 아이콘 추가
import AnalysisHourlyActivity from '../components/Analysis/AnalysisHourlyActivity';
=======
import { FaArrowUp } from 'react-icons/fa';

>>>>>>> 174a43bebcad748ff823e0de02968b59acfbd589
interface Props {
  userId: string;
}

const ExtensionHomePage = ({ userId }: Props) => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const [showArrow, setShowArrow] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

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

      if (scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCharts(true);
        }
      },
      { threshold: 0.2 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (chartRef.current) observer.unobserve(chartRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <h1 className="text-6xl font-bold text-blue-600 drop-shadow-lg">WebSelf</h1>
          <br />
          <h2 className="text-2xl text-blue-800 drop-shadow-lg">-웹 사용 습관 분석 페이지에 오신 것을-</h2>
          <br />
          <h2 className="text-4xl text-blue-800 drop-shadow-lg">- 환영합니다! -</h2>
        </div>
        {showArrow && (
          <div className="absolute bottom-10 animate-bounce text-gray-400 text-3xl">ˬ</div>
        )}
      </section>

      {/* 분석 안내 영역 */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <div className="space-y-4 min-h-[40vh] flex flex-col justify-center">
          <h2 className="text-2xl text-blue-800 font-bold drop-shadow-lg">📊 웹 사용 습관 분석</h2>
          <p className="text-gray-700 text-lg">
            WebSelf가 수집한 브라우저 사용 기록을 기반으로 분석한 결과입니다.
          </p>
        </div>
        <PerDaysAnalysis userId={userId} />

        <div className="grid md:grid-cols-3 gap-x-60 gap-y-8 justify-items-center">
          <CircleGraphAnalysis userId={userId} period="7days" />
          <CircleGraphAnalysis userId={userId} period="30days" />
          <CircleGraphAnalysis userId={userId} period="90days" />
        </div>
        <ActivityChartAnalysis userId={userId} period="7days" />
        <div className="mt-10">
          <AnalysisHourlyActivity userId={userId} period="7days" />
        </div>

      </section>

      {/* 분석 차트 영역 (스크롤 시 등장) */}
      <div
        ref={chartRef}
        className={`transition-opacity duration-1000 ease-in-out ${showCharts ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <section className="px-6 pb-20 max-w-3xl mx-auto space-y-16">
          <PerDaysAnalysis userId={userId} />

          <div className="grid md:grid-cols-3 gap-x-60 gap-y-8 justify-items-center">
            <CircleGraphAnalysis userId={userId} period="7days" />
            <CircleGraphAnalysis userId={userId} period="30days" />
            <CircleGraphAnalysis userId={userId} period="90days" />
          </div>

          <ActivityChartAnalysis userId={userId} period="7days" />
        </section>
      </div>
      {/* 맨 위로 버튼 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-white/50 text-black rounded-full shadow-lg animate-float hover:bg-gray-300 transition z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ExtensionHomePage;
