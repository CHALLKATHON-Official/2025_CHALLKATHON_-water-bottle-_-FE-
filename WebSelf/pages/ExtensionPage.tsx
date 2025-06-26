import { useEffect, useRef, useState } from 'react';
import TopButton from '../components/TopButton';
import TypingIntro from '../components/TypingIntro';
import PerCategoryPieChart from '../components/Analysis/PerCategoryPieChart';
import PerTimePieChart from '../components/Analysis/PerTimePieChart';
import PerDayGraphChart from '../components/Analysis/PerDayGraphChart';
import PerDayTop5Chart from '../components/Analysis/PerDayTop5Chart';
import PerDaysPieChart from '../components/Analysis/PerDaysPieChart';
import ExtensionIntro from '../components/ExtensionIntro';

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
    <div className="flex flex-col relative">
      {/* 인트로 영역 */}
      <ExtensionIntro opacity={opacity} translateY={translateY} showArrow={showArrow} />
      {/* 분석 영역 */}
      <section className="relative">
        <section className="h-screen w-[700px] mx-auto relative mb-100 mt-100 fade-in-on-scroll">
          <TypingIntro />
        </section>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-800 drop-shadow-sm mb-8">
            어떤 사이트를 가장 많이 방문했을까요?
          </h1>
        </div>
        <div className="mb-100 mt-10 fade-in-on-scroll" ref={chartRef}>
          <PerDaysPieChart userId={userId} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 drop-shadow-sm my-12">
          "방문 횟수로 보는 나의 최애 사이트 Top 5!"
        </h2>
        <div className="grid md:grid-cols-3 mb-150 mt-15 gap-x-8 gap-y-8 justify-items-center mb-24 fade-in-on-scroll">
          <PerDayTop5Chart userId={userId} period="7days" />
          <PerDayTop5Chart userId={userId} period="30days" />
          <PerDayTop5Chart userId={userId} period="90days" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-rose-700 drop-shadow-sm my-12">
          지난 일주일 동안 나는 언제 가장 활발했을까?
        </h2>
        <div className="mb-100 mt-5 fade-in-on-scroll">
          <PerDayGraphChart userId={userId} period="7days" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-fuchsia-700 drop-shadow-sm my-12">
          하루 중 내가 가장 바쁜 시간은?
        </h2>
        <div className="mb-100 mt-5 fade-in-on-scroll">
          <PerTimePieChart userId={userId} period="7days" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-700 drop-shadow-sm my-12">
          나는 어떤 유형의 사람일까요?
        </h2>
        <div className="mb-50 mt-5 fade-in-on-scroll">
          <PerCategoryPieChart userId={userId} period="7days" />
        </div>
      </section>
      <TopButton />
    </div>
  );
};

export default ExtensionHomePage;
