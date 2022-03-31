import { useDispatch } from 'react-redux';
import { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';
import styles from './FloatingAlert.module.css';
import useAnimate from '../../../hooks/use-animate';

const FloatingAlert = ({ alert }) => {
  const dispatch = useDispatch();
  // const nodeRef = useRef();
  // const [animating, setAnimating] = useState(null);

  const { animateRef, animateThenClose, animateStyle } = useAnimate({
    onClose: () => dispatch(uiActions.removeAlert(alert.id)),
    exitInProgress: styles.exitInProgress,
    enterInProgress: styles.enterInProgress,
    enterStart: styles.enterStart,
  });

  // const closeAlert = useCallback(() => {
  //   setAnimating(styles.closeAlert);
  //   nodeRef.current.onanimationend = () =>
  //     dispatch(uiActions.removeAlert(alert.id));
  // }, [alert.id, dispatch]);

  // useEffect(() => {
  //   setAnimating(styles.openAlert);
  //   const finishOpening = () => {
  //     setAnimating(null);
  //     nodeRef.current.removeEventListener('animationend', finishOpening);
  //   };
  //   nodeRef.current.addEventListener('animationend', finishOpening);
  // }, []);

  useEffect(() => {
    const timeoutId = setTimeout(animateThenClose, 4000);
    return () => clearTimeout(timeoutId);
  }, [animateThenClose]);

  return (
    <Alert
      nodeRef={animateRef}
      alert={alert}
      onClose={animateThenClose}
      className={animateStyle}
    />
    // <CSSTransition
    //   nodeRef={nodeRef}
    //   mountOnEnter
    //   unmountOnExit
    //   in={!!alert}
    //   timeout={300}
    //   classNames={{
    //     enter: styles.enter,
    //     enterActive: styles.enterActive,
    //     exit: styles.exit,
    //     exitActive: styles.exitActive,
    //   }}
    // >
    //   <button ref={nodeRef} type="button">
    //     {alert.title}
    //   </button>
    //   {/* <Alert nodeRef={nodeRef} alert={alert} onClose={closeAlert} /> */}
    // </CSSTransition>
  );

  // return (
  //   <CSSTransition
  //     nodeRef={nodeRef}
  //     timeout={300}
  //     classNames={{
  //       enter: styles.enter,
  //       enterActive: styles.enterActive,
  //       exit: styles.exit,
  //       exitActive: styles.exitActive,
  //     }}
  //   >
  //     <Alert nodeRef={nodeRef} alert={alert} onClose={closeAlert} />
  //   </CSSTransition>
  //   // <Alert nodeRef={nodeRef} alert={alert} onClose={closeAlert} />
  // );
};

FloatingAlert.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default FloatingAlert;
