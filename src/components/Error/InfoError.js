import PropTypes from 'prop-types';
import Icon, { ICON_TYPE } from '../UI/Icon/Icon';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import styles from './InfoError.module.css';

const INFO_ERROR_TYPE = {
  ERROR: 'error',
  INFO: 'info',
};

const InfoError = ({ type, heading, message }) => {
  let iconClasses = styles.icon;
  let iconType;
  switch (type) {
    case INFO_ERROR_TYPE.ERROR:
      iconClasses += ` ${styles['icon--error']}`;
      iconType = ICON_TYPE.ERROR;
      break;
    case INFO_ERROR_TYPE.INFO:
      iconClasses += ` ${styles['icon--info']}`;
      iconType = ICON_TYPE.INFO;
      break;
    default:
      console.error('Unknown info error type!');
      break;
  }
  return (
    <>
      <SectionHeading>{heading}</SectionHeading>
      <div className={styles.wrapper}>
        <Icon className={iconClasses} icon={iconType} />
        <p className={styles.message}>{message}</p>
      </div>
    </>
  );
};

InfoError.propTypes = {
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default InfoError;
export { INFO_ERROR_TYPE };
