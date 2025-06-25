import  { useEffect, useRef, useState } from 'react';
import TypingIntro from '../components/TypingIntro';
import TopButton from '../components/TopButton';
import PerCategoryPieChart from '../components/Analysis/PerCategoryPieChart';
import PerTimePieChart from '../components/Analysis/PerTimePieChart';
import PerDayGraphChart from '../components/Analysis/PerDayGraphChart';
import PerDayTop5Chart from '../components/Analysis/PerDayTop5Chart';
import PerDaysPieChart from '../components/Analysis/PerDaysPieChart';

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
            fontFamily: `'Bungee', sans-serif`,
          }}
        >
          <img
            src="/WebSelf_logo_nobg.png"
            alt="WebSelf Logo"
            className="w-40 h-40 mx-auto animate-float"
          />
          <h1 className="text-6xl font-semi-bold text-blue-600 drop-shadow-lg">WebSelf</h1>
          <br />
          <h2 className="text-2xl text-blue-800 drop-shadow-lg"> 환영합니다! </h2>
          <br />
          <h2 className="text-4xl text-blue-800 drop-shadow-lg"> 당신의 웹에서의 시간을 분석해 보세요! </h2>
        </div>
        {showArrow && (
          <div className="absolute bottom-10 animate-bounce text-gray-400 text-3xl">ˬ</div>
        )}
      </section>

      <section className="px-6 py-20 max-w-3xl mx-auto">
        {/* 분석 인트로  */}
        <section className="h-screen relative mb-100 mt-100 fade-in-on-scroll">
          <TypingIntro/>
        </section>

        {/* 날짜별 원형 그래프  */}
        <div className="mb-100 mt-50 fade-in-on-scroll" ref={chartRef}>
          <PerDaysPieChart userId={userId} />
        </div>
        {/* 날짜별 top5 그래프 */}
        <div className="grid md:grid-cols-3 mb-150 mt-150 gap-x-60 gap-y-8 justify-items-center mb-24 fade-in-on-scroll">
          <PerDayTop5Chart userId={userId} period="7days" />
          <PerDayTop5Chart userId={userId} period="30days" />
          <PerDayTop5Chart userId={userId} period="90days" />
        </div>
        {/* 날짜별 막대 그래프 */}
        <div className="mb-100 mt-100 fade-in-on-scroll">
        <PerDayGraphChart userId={userId} period="7days" />
        </div>
        {/* 시간별 원형 그래프 */}
        <div className="mb-100 mt-100 fade-in-on-scroll">
        <PerTimePieChart userId={userId} period="7days" />
        </div>
        {/* 사이트 유형별 원형 그래프 */}
        <div className="mb-50 mt-100 fade-in-on-scroll ">
          <PerCategoryPieChart userId={userId} period="7days" />
        </div>
      </section>

      {/* 맨 위로 버튼 */}
      <TopButton />
    </div>
  );
};

export default ExtensionHomePage;
