import React from "react";
import styles from "./NavTopLeft.module.css";
import Hamburger from "../../UI/Hamburger/Hamburger";
import Logo from "./Logo";

const NavTopLeft = ({ className, hamburgerClickHandler }) => {
  const navClasses = styles.wrapper + (className ? ` ${className}` : "");

  return (
    <nav className={navClasses}>
      <div className={styles["hamburger-display-control"]}>
        <Hamburger
          className={styles.hamburger}
          onClick={hamburgerClickHandler}
        />
      </div>
      <Logo />
    </nav>
  );
};

export default NavTopLeft;
