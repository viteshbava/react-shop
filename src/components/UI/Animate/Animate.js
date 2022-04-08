import { Children, isValidElement, cloneElement, useCallback } from 'react';
import useAnimateEnter from '../../../hooks/use-animateEnter';
import useAnimateExit from '../../../hooks/use-animateExit';
import styles from './Animate.module.css';

const Animate = ({
  isMounted,
  enterTime = 0,
  exitTime = 0,
  onClose = () => {},
  children,
  animation = null,
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

  let enterStyle;
  let exitStyle;

  // Verify the supplied animation if either 'fade' or an object of classes to apply when animating
  // 'fade' is the built in 'default' animatin (styles defined in Animate.module.css)
  if (!animation || (animation !== 'fade' && typeof animation !== 'object')) {
    const errorMsg = `Invalid animation value supplied to Animation component: ${animation}.  Must be either "fade" or an object of css classes!`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // set animation styles accordingly
  if (animation === 'fade') {
    enterStyle = styles['enter-fade'];
    exitStyle = styles['exit-fade'];
  }
  if (typeof animation === 'object') {
    enterStyle = animation.enter;
    exitStyle = animation.exit;
  }

  // Set whether the element is 'entering'
  const { isEntering } = useAnimateEnter({
    isMounted,
    enterTime,
    focusRef,
  });

  // onExit is the logic to perform (if any) upon ending of exit animation
  const onExit = useCallback(onClose, [onClose]);

  // Set whether the element is 'exiting'
  const { isExiting, shouldRender } = useAnimateExit({
    isMounted,
    exitTime,
    onExit,
  });

  if (!shouldRender) return null;

  // Define object of classes based on animation; to be passed to child element
  let { className } = child.props;
  className = !className ? '' : className;
  if (isEntering) className += `${className === '' ? '' : ' '}${enterStyle}`;
  if (isExiting) className += `${className === '' ? '' : ' '}${exitStyle}`;

  // NOTE: if an animation is not working, check the child can in fact receive and consume the className prop!

  return cloneElement(child, { className });
};

export default Animate;
