'use client';

import { useState, useEffect } from 'react';

export const useOrientation = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    
    const handleOrientationChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsPortrait(e.matches);
    };

    setIsPortrait(mediaQuery.matches);
    
    mediaQuery.addEventListener("change", handleOrientationChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  return isPortrait;
};
