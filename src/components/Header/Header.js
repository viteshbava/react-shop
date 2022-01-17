import React from "react";
import { useState } from "react";
import styles from "./Header.module.css";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";

const Header = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  const hamburgerClickHandler = () => {
    setShowSideNav((prev) => !prev);
  };

  return (
    <header>
      <div className={`container ${styles.wrapper}`}>
        <button
          className={styles["nav-mobile"]}
          onClick={hamburgerClickHandler}
        >
          <Icon icon={showSideNav ? ICON_TYPE.TIMES : ICON_TYPE.HAMBURGER} />
        </button>

        <div className={styles.logo}>React Shop</div>
        <nav className={styles["nav-desktop"]}>
          <Button style={BTN_TYPE.SECONDARY}>
            <Icon icon={ICON_TYPE.SIGNOUT} />
            Sign out
          </Button>
          <Button style={BTN_TYPE.SECONDARY}>
            <Icon icon={ICON_TYPE.HEART_FULL} />
            Wishlist (2)
          </Button>
          <Button style={BTN_TYPE.PRIMARY}>
            <Icon icon={ICON_TYPE.CART} />
            Cart (3)
          </Button>
          {/* <Button style={BTN_TYPE.PRIMARY}>
            <Icon icon={ICON_TYPE.SIGNIN} />
            Sign in
          </Button> */}
        </nav>
        <nav className={styles["nav-mobile"]}>
          <button>
            <Icon icon={ICON_TYPE.CART} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
