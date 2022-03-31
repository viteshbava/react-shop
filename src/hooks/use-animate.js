import { useRef, useState, useCallback, useEffect } from 'react';

const useAnimate = ({
  onClose,
  enterStart,
  enterInProgress,
  exitInProgress,
}) => {
  const animateRef = useRef();
  const [animateStyle, setAnimateStyle] = useState(enterStart);

  const animateThenClose = useCallback(() => {
    setAnimateStyle(exitInProgress);
    animateRef.current.onanimationend = () => onClose();
  }, [onClose, exitInProgress]);

  useEffect(() => {
    setAnimateStyle(enterInProgress);
    const finishOpening = () => {
      setAnimateStyle('');
      animateRef.current.removeEventListener('animationend', finishOpening);
    };
    animateRef.current.addEventListener('animationend', finishOpening);
  }, [enterInProgress]);

  return {
    animateRef,
    animateThenClose,
    animateStyle,
  };
};

export default useAnimate;
