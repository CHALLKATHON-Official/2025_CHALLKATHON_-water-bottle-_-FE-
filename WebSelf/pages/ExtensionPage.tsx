import React, { useState } from 'react';
import PerDaysAnalysis from '../components/Analysis/PerDaysAnalysis';
import CircleGraphAnalysis from '../components/Analysis/CircleGraphAnalysis';
import ActivityChartAnalysis from '../components/Analysis/ActivityChartAnalysis'

interface Props {
  userId: string;
}

const ExtensionHomePage = ({ userId }: Props) => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const [showArrow, setShowArrow] = useState(true);

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
      
      <section className="px-6 py-20 max-w-3xl mx-auto space-y-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">📊 웹 사용 습관 분석</h2>
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
      </section>
    </div>
  );
};

export default ExtensionHomePage;
