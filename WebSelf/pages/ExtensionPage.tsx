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
        <div className="mb-100 mt-50 fade-in-on-scroll" ref={chartRef}>
          <PerDaysPieChart userId={userId} />
        </div>
        <div className="grid md:grid-cols-3 mb-150 mt-150 gap-x-8 gap-y-8 justify-items-center mb-24 fade-in-on-scroll">
          <PerDayTop5Chart userId={userId} period="7days" />
          <PerDayTop5Chart userId={userId} period="30days" />
          <PerDayTop5Chart userId={userId} period="90days" />
        </div>
        <div className="mb-100 mt-100 fade-in-on-scroll">
          <PerDayGraphChart userId={userId} period="7days" />
        </div>
        <div className="mb-100 mt-100 fade-in-on-scroll">
          <PerTimePieChart userId={userId} period="7days" />
        </div>
        <div className="mb-50 mt-100 fade-in-on-scroll">
          <PerCategoryPieChart userId={userId} period="7days" />
        </div>
      </section>
      <TopButton />
    </div>
  );
};

export default ExtensionHomePage;
