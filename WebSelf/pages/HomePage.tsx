import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(() => setShowArrow(true), 2000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 최대 200px 스크롤까지 페이드 아웃
  const fadeOutProgress = Math.min(scrollY / 200, 1);
  const opacity = 1 - fadeOutProgress;
  const translateY = fadeOutProgress * -30; // 위로 살짝 올라가게

  return (
    <div className="flex flex-col">
      {/* ⬆️ 인트로 영역 */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative bg-white overflow-hidden">
        <div
          className="transition-all duration-200 "
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          <img src="../public/WebSelf_logo_nobg.png" alt="WebSelf Logo" className="w-40 h-40 ml-9 animate-float" />
          <h1 className="text-6xl font-bold text-blue-600 ">WebSelf</h1>
        </div>

        {/* 화살표는 여전히 등장 */}
        {showArrow && (
          <div className="absolute bottom-10 animate-bounce text-gray-400 text-3xl">
          ˬ
          </div>
        )}
      </section>

      {/* ⬇️ 본문 */}
      <section className="px-6 py-16 max-w-3xl mx-auto space-y-14">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">📊 웹 사용 습관 시각화</h2>
          <p className="text-gray-700 text-lg">
            WebSelf는 브라우저 사용 기록을 분석해 시간대별 사용 패턴과 사이트별 집중도를 시각적으로 제공합니다.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold">✨ 주요 기능</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-base">
            <li>브라우저 사용시간 자동 기록</li>
            <li>시간대별 패턴 시각화</li>
            <li>전 세계 사용자와 비교 분석</li>
          </ul>
        </div>

        <div className="text-center pt-6">
          <Link to="/download">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow transition">
              크롬 익스텐션 다운로드
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
