import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Analysis1 from '../pages/Analysis1';
import React from 'react';

// UUID 생성 함수
const generateUUID = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11)
    .replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

// 로컬에서 userId 가져오거나 생성
const getOrCreateUserId = () => {
  const userId = localStorage.getItem('userId');
  console.log("🌐 웹에서 userId:", userId);
  return userId;
};


const HomePage = () => {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState<boolean | null>(null); // null은 로딩중
  const userId = getOrCreateUserId();

  useEffect(() => {
  fetch(`http://localhost:3000/api/check/${userId}/7days`)
    .then(res => {
      console.log('📥 서버 응답 객체:', res); // 여기!
      return res.json(); // JSON 변환 후
    })
    .then(data => {
      console.log('📊 서버에서 받은 데이터:', data); // 파싱된 JSON 출력
      setIsExtensionInstalled(data.length > 0);
    })
    .catch(err => {
      console.error('❌ API 호출 오류:', err);
      setIsExtensionInstalled(false);
    });
}, [userId]);


  
  if (isExtensionInstalled === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">🔄 확장 설치 여부 확인 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* ⬆️ 인트로 영역 */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative bg-white overflow-hidden">
        <img src="/WebSelf_logo_nobg.png" alt="WebSelf Logo" className="w-40 h-40 animate-float" />
        <h1 className="text-6xl font-bold text-blue-600 mt-4">WebSelf</h1>
      </section>

      {isExtensionInstalled ? (
        <>
          {/* ✅ 분석 섹션들 */}
          <section className="px-6 py-20 max-w-3xl mx-auto space-y-16">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">📊 웹 사용 습관 분석</h2>
              <p className="text-gray-700 text-lg">
                WebSelf가 수집한 브라우저 사용 기록을 기반으로 분석한 결과입니다.
              </p>
            </div>

            {/* ⬇️ 분석 컴포넌트들 삽입 */}
            { <Analysis1 userId={userId} /> }
            {/* <Analysis2 userId={userId} /> */}
            {/* <Analysis3 userId={userId} /> */}
          </section>
        </>
      ) : (
        <section className="text-center py-20 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">WebSelf 확장 프로그램이 설치되어 있지 않아요 😢</h2>
          <p className="text-gray-600 mb-6">사이트 이용을 위해 확장 프로그램을 먼저 설치해주세요.</p>
          <Link to="/download">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition">
              크롬 익스텐션 다운로드
            </button>
          </Link>
        </section>
      )}
    </div>
  );
};

export default HomePage;
