import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

interface Props {
  showAfter?: number; // 몇 px 스크롤 후 보여줄지
}

const TopButton: React.FC<Props> = ({ showAfter = 400 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > showAfter);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-white/50 text-black rounded-full shadow-lg animate-float hover:bg-gray-300 transition z-50"
    >
      <FaArrowUp />
    </button>
  );
};

export default TopButton;
