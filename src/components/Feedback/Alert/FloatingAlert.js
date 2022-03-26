import { useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';

const FloatingAlert = ({ alert }) => {
  const dispatch = useDispatch();

  const closeAlert = useCallback(
    () => dispatch(uiActions.removeAlert(alert.id)),
    [alert.id, dispatch]
  );

  useEffect(() => {
    const timeoutId = setTimeout(closeAlert, 4000);
    return () => clearTimeout(timeoutId);
  }, [closeAlert]);

  return <Alert alert={alert} onClose={closeAlert} />;
};

FloatingAlert.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default FloatingAlert;
