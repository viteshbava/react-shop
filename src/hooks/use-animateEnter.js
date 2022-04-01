import { useState, useEffect } from 'react';

const useAnimateEnter = ({ isMounted, enterTime = 0 }) => {
  const [enterDone, setEnterDone] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    let enterTimeoutId;

    if (isMounted && !enterDone) {
      setIsEntering(true);
      enterTimeoutId = setTimeout(() => {
        setIsEntering(false);
        setEnterDone(true);
      }, enterTime);
    }

    if (!isMounted) setEnterDone(false);

    return () => clearTimeout(enterTimeoutId);
  }, [enterTime, isMounted, enterDone]);

  return { isEntering };
};

export default useAnimateEnter;
