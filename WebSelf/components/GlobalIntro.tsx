import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlobalIntro = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowArrow(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
      
      {/* 퍼지는 원 애니메이션 (은은하게 뒤에만) */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-2xl"
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 인트로 */}
      <div className="text-6xl text-blue-600 drop-shadow-lg mb-6">🌐</div>
      <div className="transition-all duration-500 z-10">
        
      </div>

      {/* 아래 화살표 */}
      {showArrow && (
        <div className="absolute bottom-10 animate-bounce text-gray-400 text-3xl">
          ˬ
        </div>
      )}
    </section>
  );
};

export default GlobalIntro;
