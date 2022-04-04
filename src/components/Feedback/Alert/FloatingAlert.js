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
  const [show, setShow] = useState(true);

  const { isEntering } = useAnimateEnter({
    isMounted: show,
    enterTime: 500,
  });
  const { isExiting, shouldRender } = useAnimateExit({
    isMounted: show,
    exitTime: 500,
  });

  let animateStyle = '';
  if (isEntering) animateStyle = styles['enter-animate'];
  if (isExiting) animateStyle = styles['exit-animate'];

  const onClickHandler = () => setShow(false);

  useEffect(() => {
    if (!shouldRender && !show) {
      dispatch(uiActions.removeAlert(alert.id));
    }
  }, [alert.id, dispatch, shouldRender, show]);

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
