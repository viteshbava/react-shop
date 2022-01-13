import React from "react";
import styles from "./Header.module.css";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";

const Header = () => {
  return (
    <header>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.logo}>React Shop</div>
        <nav>
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
          <Button style={BTN_TYPE.PRIMARY}>
            <Icon icon={ICON_TYPE.SIGNIN} />
            Sign in
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
