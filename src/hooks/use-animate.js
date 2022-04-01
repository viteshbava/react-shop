import { useState, useEffect } from 'react';

const useAnimate = ({ isMounted, enterTime = 0, exitTime = 0 }) => {
  console.log('Start of Custom Hook...');
  const [shouldRender, setShouldRender] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [initial, setInitial] = useState(true);

  console.log('custom hook: isMounted: ', isMounted);

  console.log(
    `shouldRender: ${shouldRender}, isEntering: ${isEntering}, enterTime: ${enterTime}, exitTime: ${exitTime}, isMounted: ${isMounted}`
  );

  useEffect(() => {
    console.log('Running useEffect in useAnimate custom hook...');
    let enterTimeoutId;
    let exitTimeoutId;

    if (isMounted && initial) {
      console.log('First time being mounted, so set isEntering to true now');
      setInitial(false);
      setIsEntering(true);
    }

    const firstRender = isMounted && !shouldRender;
    const toBeUnmounted = !isMounted && shouldRender;

    // rendering component for the first time
    if (firstRender) {
      setShouldRender(true);
      console.log('Set timer for entering');
      enterTimeoutId = setTimeout(() => {
        console.log('Setting isEntering to false now...');
        setIsEntering(false);
      }, enterTime);
    }

    // component is to be unmounted
    if (toBeUnmounted) {
      console.log('Set timer for exiting... ');
      setIsExiting(true);
      exitTimeoutId = setTimeout(() => {
        console.log('Change shouldRender to false now...');
        setShouldRender(false);
      }, exitTime);
    }

    console.log('End of useEffect in custom hook');
    return () => {
      console.log('Custom hook cleanup...');
      if (!firstRender) {
        console.log('Clearing enter animate timer');
        clearTimeout(enterTimeoutId);
      }
      if (!toBeUnmounted) {
        console.log('Clearing exit animate timer');
        clearTimeout(exitTimeoutId);
      }
    };
  }, [shouldRender, enterTime, exitTime, isMounted, isEntering]);

  console.log('End of custom hook');
  return { shouldRender, isEntering, isExiting };
};

export default useAnimate;
