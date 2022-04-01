import { useState, useEffect } from 'react';

const useAnimateEnter = ({ isMounted, enterTime = 0 }) => {
  const [enterStarted, setEnterStarted] = useState(false);
  const [enterDone, setEnterDone] = useState(false);

  useEffect(() => {
    let enterTimeoutId;

    if (isMounted && !enterStarted && !enterDone) {
      setEnterStarted(true);
      enterTimeoutId = setTimeout(() => {
        setEnterDone(true);
      }, enterTime);
    }

    return () => clearTimeout(enterTimeoutId);
  }, [enterTime, isMounted, enterStarted, enterDone]);

  return { isEntering: enterStarted && !enterDone };
};

export default useAnimateEnter;
