import React from "react";
import styles from "./NavMobileLeft.module.css";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";

const NavMobileLeft = ({
  className,
  hamburgerClickHandler,
  showMobileCollapseNav,
}) => {
  const navClasses = styles.wrapper + (className ? ` ${className}` : "");
  return (
    <nav className={navClasses}>
      <button onClick={hamburgerClickHandler}>
        <Icon
          icon={showMobileCollapseNav ? ICON_TYPE.TIMES : ICON_TYPE.HAMBURGER}
        />
      </button>
    </nav>
  );
};

export default NavMobileLeft;
