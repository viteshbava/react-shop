import { useDispatch } from 'react-redux';
import { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';
import styles from './FloatingAlert.module.css';

import useAnimateEnter from '../../../hooks/use-animateEnter';
import useAnimateExit from '../../../hooks/use-animateExit';

const FloatingAlert = ({ alert }) => {
  const dispatch = useDispatch();
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (isEntering) {
      timeoutId = setTimeout(() => setIsEntering(false), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [isEntering]);

  useEffect(() => {
    let timeoutId;
    if (isExiting) {
      timeoutId = setTimeout(
        () => dispatch(uiActions.removeAlert(alert.id)),
        500
      );
    }
    return () => clearTimeout(timeoutId);
  }, [isExiting, alert.id, dispatch]);

  let animateStyle = '';
  if (isEntering) animateStyle = styles['enter-animate'];
  if (isExiting) animateStyle = styles['exit-animate'];

  const onClickHandler = () => {
    setIsExiting(true);
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
