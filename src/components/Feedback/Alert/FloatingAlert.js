import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';
import Animate from '../../UI/Animate/Animate';

const FloatingAlert = ({ alert, className }) => {
  const dispatch = useDispatch();

  const closeAlert = useCallback(
    () => dispatch(uiActions.removeAlert(alert.id)),
    [alert.id, dispatch]
  );

  useEffect(() => {
    const autoCloseTimer = setTimeout(closeAlert, 5000);
    return () => clearTimeout(autoCloseTimer);
  }, [closeAlert]);

  return <Alert alert={alert} onClose={closeAlert} className={className} />;
};

FloatingAlert.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default FloatingAlert;
