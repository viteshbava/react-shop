import { useState, useEffect } from 'react';

const useAnimateExit = ({
  isMounted = true,
  exitTime = 0,
  onExit = () => {},
}) => {
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

  // If an onExit function has been supplied, run it when exiting has finished
  useEffect(() => {
    if (!shouldRender && !isMounted) {
      onExit();
    }
    return () => {};
  }, [onExit, shouldRender, isMounted]);

  return { isExiting, shouldRender };
};

export default useAnimateExit;
