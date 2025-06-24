import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 또는 'auto'
  }, [pathname]);

  return null;
};

export default ScrollTop;
