import React, { useState } from 'react';
import PerDaysAnalysis from '../components/Analysis/PerDaysAnalysis';
import CircleGraphAnalysis from '../components/Analysis/CircleGraphAnalysis';
import AnalysisActivityChart from '../components/Analysis/AnalysisActivityChart'
import AnalysisHourlyActivity from '../components/Analysis/AnalysisHourlyActivity';

interface Props {
  userId: string;
}

const ExtensionHomePage = ({ userId }: Props) => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const [showArrow, setShowArrow] = useState(true);

  return (
    <div className="flex flex-col">
      <section className="h-screen flex flex-col items-center justify-center text-center relative bg-white overflow-hidden">
        <div
          className="transition-all duration-200"
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          <img src="/WebSelf_logo_nobg.png" alt="WebSelf Logo" className="w-40 h-40 ml-9 animate-float" />
          <h1 className="text-6xl font-bold text-blue-600">WebSelf</h1>
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
        <AnalysisActivityChart userId={userId} period="7days" />
        <div className="mt-10">
          <AnalysisHourlyActivity userId={userId} period="7days" />
        </div>
      </section>
    </div>
  );
};

export default ExtensionHomePage;
