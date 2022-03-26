import PropTypes from 'prop-types';
import styles from './Alert.module.css';
import Icon, { ICON_TYPE } from '../../UI/Icon/Icon';

const ALERT_TYPE = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
};

const Alert = ({ alert, onClose }) => {
  const { type, title, message } = alert;
  const containerClasses = `${styles.container} ${
    styles[`container--${type}`]
  }`;

  let icon;
  switch (type) {
    case ALERT_TYPE.ERROR:
      icon = ICON_TYPE.ERROR;
      break;
    case ALERT_TYPE.SUCCESS:
      icon = ICON_TYPE.SUCCESS;
      break;
    case ALERT_TYPE.INFO:
      icon = ICON_TYPE.INFO;
      break;
    case ALERT_TYPE.WARNING:
      icon = ICON_TYPE.WARNING;
      break;
    default:
      console.error('Unknown alert type!');
      break;
  }

  return (
    <div className={containerClasses}>
      <Icon className={styles.icon} icon={icon} />
      <div className={styles.content}>
        <p className={styles.content__title}>
          <span className={styles.title__label}>{`${type}: `}</span>
          {title}
        </p>
        <p className={styles.content__message}>{message}</p>
      </div>
      <button type="button" className={styles.close} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
export { ALERT_TYPE };
