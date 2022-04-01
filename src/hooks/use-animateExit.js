import { useState, useEffect } from 'react';

const useAnimateExit = ({ isMounted, exitTime = 0 }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let exitTimeoutId;

    if (isMounted && !shouldRender) setShouldRender(true);

    if (!isMounted && shouldRender) {
      setIsExiting(true);
      exitTimeoutId = setTimeout(() => {
        setShouldRender(false);
        setIsExiting(false);
      }, exitTime);
    }

    return () => clearTimeout(exitTimeoutId);
  }, [exitTime, isMounted, shouldRender]);

  return { shouldRender, isExiting };
};

export default useAnimateExit;
