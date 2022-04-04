import { useState, useEffect } from 'react';

const useAnimateEnter = ({
  isMounted = true,
  enterTime = 0,
  focusRef = null,
}) => {
  const [enterDone, setEnterDone] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    let enterTimeoutId;

    if (isMounted && !enterDone) {
      setIsEntering(true);
      enterTimeoutId = setTimeout(() => {
        setIsEntering(false);
        setEnterDone(true);
        if (focusRef?.current) focusRef.current.focus();
      }, enterTime);
    }

    if (!isMounted) setEnterDone(false);

    return () => clearTimeout(enterTimeoutId);
  }, [enterTime, isMounted, enterDone, focus]);

  return { isEntering };
};

export default useAnimateEnter;
