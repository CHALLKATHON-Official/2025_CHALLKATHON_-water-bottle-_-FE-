import { useEffect, useState } from 'react';
import ExtensionPage from './ExtensionPage';
import NonExtensionPage from './NonExtensionPage';

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};


const getOrCreateUserId = (): string => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem("userId", userId);
  }
  return userId;
};

const HomePage = () => {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState<boolean | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [userId] = useState<string>(getOrCreateUserId());

  useEffect(() => {
    fetch(`https://webself-be.onrender.com/api/check/${userId}/7days`)
      .then(res => res.json())
      .then(data => {
        setFadeOut(true);
        setTimeout(() => {
          setIsExtensionInstalled(data.length > 0);
          setShowPage(true);
        }, 600);
      })
      .catch(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsExtensionInstalled(false);
          setShowPage(true);
        }, 600);
      });
  }, [userId]);

  if (isExtensionInstalled === null) {
    return (
      <div className={`h-screen flex flex-col items-center justify-center gap-6 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-blue-500 drop-shadow-xl rounded-full animate-bounce delay-[0ms]" />
          <span className="w-3 h-3 bg-blue-500 drop-shadow-xl rounded-full animate-bounce delay-[200ms]" />
          <span className="w-3 h-3 bg-blue-500 drop-shadow-xl rounded-full animate-bounce delay-[400ms]" />
        </div>
        <p className="text-blue-600 text-xl drop-shadow-lg animate-pulse">
          확장 프로그램 설치 여부 확인 중...
        </p>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-700 ${showPage ? 'opacity-100' : 'opacity-0'}`}>
      {isExtensionInstalled ? (
        <ExtensionPage userId={userId} />
      ) : (
        <NonExtensionPage />
      )}
    </div>
  );
};

export default HomePage;
