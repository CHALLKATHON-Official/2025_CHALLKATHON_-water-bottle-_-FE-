import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TypingIntro = () => {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const messages = [
    '당신의 디지털 흔적을 수집 중입니다...',
    'WebSelf가 사용자의 행동 패턴을 감지 중입니다...',
    'WebSelf가 생각 중입니다...',
    '데이터 스트림 확보. 알고리즘 가동...'
  ];

  // ✅ 기존 타이핑 로직은 그대로
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1500); // 각 문장 1.5초 간격

    return () => clearInterval(interval);
  }, []);

  // ✅ GSAP ScrollTrigger 로직만 추가
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lockScroll = () => {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      onEnter: () => {
        lockScroll();

        // 4단계 타이핑 완료 시간 후 해제 (1.5초 x 4 = 6초)
        setTimeout(() => {
          unlockScroll();
        }, 6000);
      },
      once: true, // 한 번만 실행
    });

    return () => {
      trigger.kill();
      unlockScroll();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[60vh] flex flex-col items-center justify-center space-y-10 relative"
    >
      <h2 className="text-3xl font-bold text-blue-900 mb-6 drop-shadow-lg">
        분석 시스템 초기화 중...
      </h2>

      {step >= 1 && (
        <div className="absolute left-[15%] top-[10%] bg-white px-6 py-3 rounded-full shadow-xl text-lg text-gray-800">
          <span className="typing">{messages[0]}</span>
        </div>
      )}
      {step >= 2 && (
        <div className="absolute right-[10%] bottom-[10%] bg-white px-6 py-3 rounded-full shadow-xl text-lg text-gray-800">
          <span className="typing">{messages[1]}</span>
        </div>
      )}
      {step >= 3 && (
        <div className="absolute right-[90%] top-[45%] bg-white px-6 py-3 rounded-full shadow-xl text-lg text-gray-800">
          <span className="typing">{messages[2]}</span>
        </div>
      )}
      {step >= 4 && (
        <div className="absolute left-[80%] bottom-[55%] bg-white px-6 py-3 rounded-full shadow-xl text-lg text-gray-800">
          <span className="typing">{messages[3]}</span>
        </div>
      )}
    </div>
  );
};

export default TypingIntro;
