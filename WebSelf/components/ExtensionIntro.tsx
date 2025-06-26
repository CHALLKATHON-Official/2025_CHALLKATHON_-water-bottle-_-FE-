// src/components/ExtensionIntro.tsx
import React from 'react';

interface Props {
  opacity: number;
  translateY: number;
  showArrow: boolean;
}

const ExtensionIntro = ({ opacity, translateY, showArrow }: Props) => {
  return (
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
  );
};

export default ExtensionIntro;
