import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';
import Animate from '../../UI/Animate/Animate';

const FloatingAlert = ({ alert }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let autoCloseTimer;
    if (show) {
      autoCloseTimer = setTimeout(() => setShow(false), 5000);
    } else clearTimeout(autoCloseTimer);
    return () => clearTimeout(autoCloseTimer);
  }, [show]);

  const onClickHandler = () => {
    setShow(false);
  };

  return (
    <Animate
      isMounted={show}
      onClose={() => dispatch(uiActions.removeAlert(alert.id))}
      enterTime={200}
      exitTime={200}
      animation="fade"
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
