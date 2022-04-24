import { useState, useEffect } from 'react';

interface PropTypes {
  isMounted?: boolean;
  enterTime?: number;
  focusRef?: { current: HTMLElement } | null;
}

const useAnimateEnter = ({
  isMounted = true,
  enterTime = 0,
  focusRef = null,
}: PropTypes) => {
  const [enterDone, setEnterDone] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    let enterTimeoutId: ReturnType<typeof setTimeout>;

    // If the component has mounted and not yet gone through entering, start entering and timer
    if (isMounted && !enterDone) {
      setIsEntering(true);
      enterTimeoutId = setTimeout(() => {
        setIsEntering(false);
        setEnterDone(true);
        // if a focusRef prop has been supplied, focus it (for keyboard events)
        if (focusRef?.current) focusRef.current.focus();
      }, enterTime);
    }

    if (!isMounted) setEnterDone(false);

    return () => clearTimeout(enterTimeoutId);
  }, [enterTime, isMounted, enterDone, focusRef]);

  return { isEntering };
};

export default useAnimateEnter;
