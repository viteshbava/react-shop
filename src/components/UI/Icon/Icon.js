import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faHeart as faHeartFull,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { ReactComponent as Danger } from "./Danger.svg";
import { ReactComponent as Times } from "./Times.svg";
import styles from "./Icon.module.css";

const ICON_TYPE = {
  DANGER: "danger",
  TIMES: "times",
  SIGNIN: "signin",
  SIGNOUT: "signout",
  HEART_FULL: "heart_full",
  HEART_EMPTY: "heart_empty",
  CART: "cart",
};

const Icon = ({ className, icon }) => {
  let iconReturn;
  switch (icon) {
    case ICON_TYPE.DANGER:
      iconReturn = <Danger />;
      break;
    case ICON_TYPE.TIMES:
      iconReturn = <Times />;
      break;
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
    default:
      console.error("Invalid icon type!");
  }
  return <span className={`${styles.wrapper} ${className}`}>{iconReturn}</span>;
};

export default Icon;
export { ICON_TYPE };
