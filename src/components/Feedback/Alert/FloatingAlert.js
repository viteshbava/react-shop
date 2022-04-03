import { useDispatch } from 'react-redux';
import { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';
import styles from './FloatingAlert.module.css';

import useAnimateEnter from '../../../hooks/use-animateEnter';
import useAnimateExit from '../../../hooks/use-animateExit';

const useDelayExit = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [exitingDone, setExitingDone] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isExiting) {
      timeoutId = setTimeout(() => setExitingDone(true), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [isExiting]);

  return { setIsExiting: () => setIsExiting(true), isExiting, exitingDone };
};

const FloatingAlert = ({ alert }) => {
  const dispatch = useDispatch();
  const [isEntering, setIsEntering] = useState(true);
  const { setIsExiting, isExiting, exitingDone } = useDelayExit();

  useEffect(() => {
    let timeoutId;
    if (isEntering) {
      timeoutId = setTimeout(() => setIsEntering(false), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [isEntering]);

  let animateStyle = '';
  if (isEntering) animateStyle = styles['enter-animate'];
  if (isExiting) animateStyle = styles['exit-animate'];

  useEffect(() => {
    if (exitingDone) dispatch(uiActions.removeAlert(alert.id));
  }, [exitingDone, alert.id, dispatch]);

  const onClickHandler = () => {
    setIsExiting();
  };

  return (
    <Alert alert={alert} onClose={onClickHandler} className={animateStyle} />
  );
};

FloatingAlert.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default FloatingAlert;
