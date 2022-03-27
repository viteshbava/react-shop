import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSignOutAlt,
  faHeart as faHeartFull,
  faShoppingCart,
  faBars as faHamburger,
  faTimes,
  faExclamationCircle,
  faInfoCircle,
  faExclamationTriangle,
  faCheckCircle,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import styles from './Icon.module.css';
import Badge from '../Badge/Badge';

const ICON_TYPE = {
  SIGNIN: 'signin',
  SIGNOUT: 'signout',
  REGISTER: 'register',
  HEART_FULL: 'heart_full',
  HEART_EMPTY: 'heart_empty',
  CART: 'cart',
  HAMBURGER: 'hamburger',
  TIMES: 'times',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'tick',
  WARNING: 'warning',
};

const Icon = ({ className, icon, badge, badgeClasses }) => {
  let iconReturn;
  switch (icon) {
    case ICON_TYPE.SIGNIN:
      iconReturn = <FontAwesomeIcon icon={faSignInAlt} />;
      break;
    case ICON_TYPE.SIGNOUT:
      iconReturn = <FontAwesomeIcon icon={faSignOutAlt} />;
      break;
    case ICON_TYPE.REGISTER:
      iconReturn = <FontAwesomeIcon icon={faUserPlus} />;
      break;
    case ICON_TYPE.HEART_FULL:
      iconReturn = <FontAwesomeIcon icon={faHeartFull} />;
      break;
    case ICON_TYPE.HEART_EMPTY:
      iconReturn = <FontAwesomeIcon icon={faHeartEmpty} />;
      break;
    case ICON_TYPE.CART:
      iconReturn = <FontAwesomeIcon icon={faShoppingCart} />;
      break;
    case ICON_TYPE.HAMBURGER:
      iconReturn = <FontAwesomeIcon icon={faHamburger} />;
      break;
    case ICON_TYPE.TIMES:
      iconReturn = <FontAwesomeIcon icon={faTimes} />;
      break;
    case ICON_TYPE.ERROR:
      iconReturn = <FontAwesomeIcon icon={faExclamationCircle} />;
      break;
    case ICON_TYPE.INFO:
      iconReturn = <FontAwesomeIcon icon={faInfoCircle} />;
      break;
    case ICON_TYPE.WARNING:
      iconReturn = <FontAwesomeIcon icon={faExclamationTriangle} />;
      break;
    case ICON_TYPE.SUCCESS:
      iconReturn = <FontAwesomeIcon icon={faCheckCircle} />;
      break;
    default:
      console.error(`Invalid icon type: ${icon}`);
  }
  const spanClasses = styles.wrapper + (className ? ` ${className}` : '');
  const badgeStyles = styles.badge + (badgeClasses ? ` ${badgeClasses}` : '');
  return (
    <span className={spanClasses}>
      {iconReturn}
      {badge && <Badge className={badgeStyles}>{badge}</Badge>}
    </span>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  badge: PropTypes.node,
  badgeClasses: PropTypes.string,
};
Icon.defaultProps = {
  className: null,
  badge: null,
  badgeClasses: null,
};

// className, icon, badge, badgeClasses

export default Icon;
export { ICON_TYPE };
