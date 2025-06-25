import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const messages = [
  { x: '30%', y: '40%', text: 'KR 한국에서 접속 중...' },
  { x: '55%', y: '35%', text: '🇺🇸 미국에서 활동 중...' },
  { x: '70%', y: '45%', text: '🇯🇵 일본 사용자 분석 중...' },
  { x: '40%', y: '60%', text: '🇩🇪 독일에서도 기록 중...' },
  { x: '50%', y: '10%', text: '🌍 전 세계의 클릭을 수집합니다...' },
];

const GlobalPageIntro = () => {
  const [step, setStep] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.7, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % (messages.length + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-[450px] bg-white flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* 중앙 지도 이미지 */}
      <img
        src="../public/world-map.svg"
        alt="world map"
        className="w-[100%] max-w-[700px] opacity-50 z-0"
      />
      {/* 점 + 멘트 출력 */}
      {inView &&
        messages.slice(0, step).map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute z-10"
            style={{
              left: msg.x,
              top: msg.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-3 h-3 bg-blue-600 rounded-full shadow-md mb-2 animate-ping" />
            <div className="text-xs text-blue-600 px-2 py-1 drop-shadow-lg">
              {msg.text}
            </div>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default GlobalPageIntro;
