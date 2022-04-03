import { useDispatch } from 'react-redux';
import { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';
import styles from './FloatingAlert.module.css';

import useAnimateEnter from '../../../hooks/use-animateEnter';
import useAnimateExit from '../../../hooks/use-animateExit';

const useDelayExit = ({ onExit }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isExiting) {
      timeoutId = setTimeout(onExit, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [isExiting, onExit]);

  return { isExiting, setIsExiting: () => setIsExiting(true) };
};

const FloatingAlert = ({ alert }) => {
  const dispatch = useDispatch();
  const [isEntering, setIsEntering] = useState(true);
  const { isExiting, setIsExiting } = useDelayExit({
    onExit: () => dispatch(uiActions.removeAlert(alert.id)),
  });

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
