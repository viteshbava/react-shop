import { useDispatch } from 'react-redux';
import { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';
import styles from './FloatingAlert.module.css';

const FloatingAlert = ({ alert }) => {
  const dispatch = useDispatch();
  const nodeRef = useRef();

  const closeAlert = useCallback(() => {
    console.log('closing alert');
    dispatch(uiActions.removeAlert(alert.id));
  }, [alert.id, dispatch]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(closeAlert, 4000);
  //   return () => clearTimeout(timeoutId);
  // }, [closeAlert]);

  console.log(styles.enterActive);

  return (
    <Alert alert={alert} onClose={closeAlert} />
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
