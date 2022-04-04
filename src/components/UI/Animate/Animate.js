import {
  Children,
  isValidElement,
  cloneElement,
  useCallback,
  useState,
} from 'react';
import useAnimateEnter from '../../../hooks/use-animateEnter';
import useAnimateExit from '../../../hooks/use-animateExit';
import styles from './Animate.module.css';

const Animate = ({
  isMounted,
  enterTime = 0,
  exitTime = 0,
  onClose,
  children,
}) => {
  const child = Children.only(children);

  // Verify the wrapped child is a valid element
  if (!isValidElement(child)) {
    const errorMsg =
      'Child of Animate wrapper UI componenet is not a valid element!';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const { isEntering } = useAnimateEnter({
    isMounted,
    enterTime,
  });

  const onExit = useCallback(onClose, [onClose]);

  const { isExiting, shouldRender } = useAnimateExit({
    isMounted,
    exitTime,
    onExit,
  });

  let className = '';
  let style;
  if (isEntering) {
    className = styles['enter-fade'];
    style = { animationDuration: `${enterTime / 1000}s` };
  }
  if (isExiting) {
    className = styles['exit-fade'];
    style = { animationDuration: `${exitTime / 1000}s` };
  }

  if (!shouldRender) return null;
  return cloneElement(child, { className, style });
};

export default Animate;
