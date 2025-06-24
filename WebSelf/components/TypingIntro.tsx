import React, { useEffect, useState } from 'react';

const TypingIntro = () => {
  const [step, setStep] = useState(0);

  const messages = [
    '당신의 디지털 흔적을 수집 중입니다...',
    'WebSelf가 사용자의 행동 패턴을 감지 중입니다...',
    'WebSelf가 생각 중입니다...',
    '데이터 스트림 확보. 알고리즘 가동...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1500); // 각 문장 1.5초 간격

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-10 relative">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 drop-shadow-lg">
        분석 시스템 초기화 중...
      </h2>

      {/* 첫 번째 문장 - 왼쪽 상단 구름 위치 */}
      {step >= 1 && (
        <div className="absolute left-[15%] top-[10%] bg-white px-6 py-3 rounded-full shadow-xl text-lg text-gray-800">
          <span className="typing">{messages[0]}</span>
        </div>
      )}

      {/* 두 번째 문장 - 오른쪽 하단 구름 위치 */}
      {step >= 2 && (
        <div className="absolute right-[10%] bottom-[10%] bg-white px-6 py-3 rounded-full shadow-xl text-lg text-gray-800">
          <span className="typing">{messages[1]}</span>
        </div>
      )}

      {/* 세 번째 문장 - 오른쪽 상단 구름 위치 */}
      {step >= 3 && (
        <div className="absolute right-[90%] top-[45%] bg-white px-6 py-3 rounded-full shadow-xl text-lg text-gray-800">
          <span className="typing">{messages[2]}</span>
        </div>
      )}
      {/* 네 번째 문장 - 오른쪽 상단 구름 위치 */}
      {step >= 4 && (
        <div className="absolute left-[80%] bottom-[55%] bg-white px-6 py-3 rounded-full shadow-xl text-lg text-gray-800">
          <span className="typing">{messages[3]}</span>
        </div>
      )}
    </div>
  );
};

export default TypingIntro;
