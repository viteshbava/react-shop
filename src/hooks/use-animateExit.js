import { useState, useEffect } from 'react';

const useAnimateExit = ({
  isMounted = true,
  exitTime = 0,
  onExit = () => {},
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // isMounted specifies if the component is/isn't showing, where as shouldRender specifies if the component should render (i.e. after it has finished animating)

  useEffect(() => {
    let exitTimeoutId;

    // On first pass, both isMounted and shouldRender would be false (so the component would not be rendered).  Once isMounted is set to true (i.e. the component has been closed/hidden) we want to set shouldRender to true also to initialise the waiting for unmounting.

    if (isMounted && !shouldRender) setShouldRender(true);

    // After above, both isMounted AND shouldRender are true, implying that the componet is currently being showing but has not been triggered to unmount yet.

    // when isMounted is set to true, umounting has been triggered.  However via shouldRender, we still want to render it until the animation is complete
    if (!isMounted && shouldRender) {
      setIsExiting(true);
      exitTimeoutId = setTimeout(() => {
        setShouldRender(false);
        setIsExiting(false);
        onExit();
      }, exitTime);
    }

    return () => clearTimeout(exitTimeoutId);
  }, [onExit, exitTime, isMounted, shouldRender]);

  return { isExiting, shouldRender };
};

export default useAnimateExit;
