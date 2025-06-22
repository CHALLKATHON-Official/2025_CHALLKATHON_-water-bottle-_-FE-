import { Link } from 'react-router-dom';
import React from 'react';

const HomePage = () => {
  return (
    <div className="px-6 py-10 max-w-3xl mx-auto space-y-14">
      {/* 인트로 섹션 */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">당신의 웹 사용 습관을 시각화해보세요</h1>
        <p className="text-gray-700 text-lg">
          WebSelf는 크롬 익스텐션을 기반으로 사용자의 웹 브라우징 데이터를 분석하고,<br />
          시간대별, 사이트별 사용 패턴을 시각적으로 보여주는 서비스입니다.
        </p>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">✨ 주요 기능</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-base">
          <li>크롬 브라우저 사용시간 자동 기록</li>
          <li>시간대별 사용 패턴 시각화</li>
          <div className="text-9xl">
            dkdkdkdk
          </div>
          <div className="text-9xl">
            dkdkdkdk
          </div>
          <div className="text-9xl">
            dkdkdkdk
          </div><div className="text-9xl">
            dkdkdkdk
          </div><div className="text-9xl">
            dkdkdkdk
          </div><div className="text-9xl">
            dkdkdkdk
          </div><div className="text-9xl">
            dkdkdkdk
          </div>
          <li>전 세계 사용자와 비교 분석</li>
          <li>회원가입 없이 쿠키 기반 개인 분석</li>
        </ul>
      </section>

      {/* 다운로드 버튼 섹션 */}
      <section className="pt-8 text-center">
        <Link to="/download">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow transition">
            크롬 익스텐션 다운로드
          </button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
