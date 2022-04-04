import { useDispatch } from 'react-redux';
import { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';
import styles from './FloatingAlert.module.css';
import Animate from '../../UI/Animate/Animate';

import useAnimateEnter from '../../../hooks/use-animateEnter';
import useAnimateExit from '../../../hooks/use-animateExit';

const FloatingAlert = ({ alert }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  // const { isEntering } = useAnimateEnter({
  //   isMounted: show,
  //   enterTime: 500,
  // });

  // const onExit = useCallback(
  //   () => dispatch(uiActions.removeAlert(alert.id)),
  //   [alert.id, dispatch]
  // );

  // const { isExiting, shouldRender } = useAnimateExit({
  //   isMounted: show,
  //   exitTime: 500,
  //   onExit,
  // });

  // let animateStyle = '';
  // if (isEntering) animateStyle = styles['enter-animate'];
  // if (isExiting) animateStyle = styles['exit-animate'];

  const onClickHandler = () => setShow(false);

  // if (!shouldRender) return null;

  return (
    <Animate
      isMounted={show}
      onClose={() => dispatch(uiActions.removeAlert(alert.id))}
      enterTime={500}
      exitTime={500}
    >
      <Alert alert={alert} onClose={onClickHandler} />
    </Animate>
  );
};

FloatingAlert.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default FloatingAlert;
