import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import styles from "./Icon.module.css";

const ICON_TYPE = {
  SIGNIN: "signin",
  SIGNOUT: "signout",
  HEART_FULL: "heart_full",
  HEART_EMPTY: "heart_empty",
  CART: "cart",
  HAMBURGER: "hamburger",
  TIMES: "times",
  ERROR: "error",
  INFO: "info",
  SUCCESS: "tick",
  WARNING: "warning",
};

const Icon = ({ className, icon }) => {
  let iconReturn;
  switch (icon) {
    case ICON_TYPE.SIGNIN:
      iconReturn = <FontAwesomeIcon icon={faSignInAlt} />;
      break;
    case ICON_TYPE.SIGNOUT:
      iconReturn = <FontAwesomeIcon icon={faSignOutAlt} />;
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
  const spanClasses = styles.wrapper + (className ? ` ${className}` : "");
  return <span className={spanClasses}>{iconReturn}</span>;
};

export default Icon;
export { ICON_TYPE };
