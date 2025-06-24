import React, { useEffect, useState } from 'react';
import ExtensionPage from './ExtensionPage';
import NonExtensionPage from './NonExtensionPage';

const generateUUID = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> (Number(c) / 4)).toString(16)
  );
};

const getOrCreateUserId = (): string => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem('userId', userId);
  }
  return userId;
};

const HomePage = () => {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState<boolean | null>(null);
  const userId = getOrCreateUserId();

  useEffect(() => {
    fetch(`http://localhost:3000/api/check/${userId}/7days`)
      .then(res => res.json())
      .then(data => setIsExtensionInstalled(data.length > 0))
      .catch(() => setIsExtensionInstalled(false));
  }, [userId]);

  if (isExtensionInstalled === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">🔄 확장 설치 여부 확인 중...</p>
      </div>
    );
  }

  return isExtensionInstalled ? (
    <NonExtensionPage userId={userId} />
  ) : (
    <ExtensionPage />
  );
};

export default HomePage;
