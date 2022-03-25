import { useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { uiActions } from '../../../redux/slices/ui-slice';

const FloatingAlert = ({ alert }) => {
  const dispatch = useDispatch();
  const { type, title, message } = alert;

  const closeAlert = useCallback(
    () => dispatch(uiActions.removeAlert(alert.id)),
    [alert.id, dispatch]
  );

  useEffect(() => {
    const timeoutId = setTimeout(closeAlert, 4000);
    return () => clearTimeout(timeoutId);
  }, [closeAlert]);

  return (
    <Alert type={type} title={title} message={message} onClose={closeAlert} />
  );
};

FloatingAlert.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default FloatingAlert;
