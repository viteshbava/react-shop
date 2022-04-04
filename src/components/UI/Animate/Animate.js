import { Children, isValidElement, cloneElement, useCallback } from 'react';
import useAnimateEnter from '../../../hooks/use-animateEnter';
import useAnimateExit from '../../../hooks/use-animateExit';
import styles from './Animate.module.css';

const Animate = ({
  isMounted,
  enterTime = 0,
  exitTime = 0,
  onClose = () => {},
  className = '',
  children,
  type = 'fade',
  focusRef = null,
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
    focusRef,
  });

  const onExit = useCallback(onClose, [onClose]);

  const { isExiting, shouldRender } = useAnimateExit({
    isMounted,
    exitTime,
    onExit,
  });

  let classes = className;
  let style;
  if (isEntering) {
    classes += ` ${styles[`enter-${type}`]}`;
    style = { animationDuration: `${enterTime / 1000}s` };
  }
  if (isExiting) {
    classes += ` ${styles[`exit-${type}`]}`;
    style = { animationDuration: `${exitTime / 1000}s` };
  }

  if (!shouldRender) return null;

  return cloneElement(child, { className: classes, style });
};

export default Animate;
