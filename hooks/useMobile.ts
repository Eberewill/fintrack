import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 1024): boolean {
  const getIsMobile = () =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}