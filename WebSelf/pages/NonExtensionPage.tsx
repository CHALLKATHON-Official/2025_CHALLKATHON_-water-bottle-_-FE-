import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa'; // 화살표 아이콘 추가

const NonExtensionHomePage = () => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const [showArrow, setShowArrow] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false); // 맨위버튼 표시 여부

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 인트로 텍스트 사라지게
      if (scrollY > 100) {
        setOpacity(0);
        setTranslateY(-50);
        setShowArrow(false);
      } else {
        setOpacity(1);
        setTranslateY(0);
        setShowArrow(true);
      }

      // 맨 위로 버튼 보이게
      if (scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 맨 위로 이동 함수
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

      {/* 안내 영역 */}
      <section className="text-center py-24 bg-gradient-to-t from-blue-100 to-white min-h-screen flex flex-col justify-center items-center space-y-8">
        <h2 className="text-4xl text-indigo-700 drop-shadow-md">
          😢 확장 프로그램이 아직 설치되지 않았어요!
        </h2>
        <p className="text-lg font-light text-gray-700 max-w-xl">
          웹 사용 습관 분석을 위해 WebSelf 확장 프로그램을 설치해주세요.
          설치 후 자동으로 분석이 시작돼요!
        </p>
        <Link to="/download">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bungee text-xl tracking-wide px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:animate-float">
            ✨ 크롬 익스텐션 다운로드 ✨
          </button>
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          설치 후, 브라우저를 새로고침하거나 다시 방문해주세요.
        </p>
      </section>

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

export default NonExtensionHomePage;
