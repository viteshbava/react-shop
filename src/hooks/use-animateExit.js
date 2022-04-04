import { useState, useEffect } from 'react';

const useAnimateExit = ({ isMounted = true, exitTime = 0 }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

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

  return { isExiting, shouldRender };
};

export default useAnimateExit;
