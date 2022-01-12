import React from "react";
import styles from "./Header.module.css";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.logo}>React Shop</div>
        <nav>
          <Button style={BTN_TYPE.SECONDARY}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Sign out
          </Button>
          <Button style={BTN_TYPE.SECONDARY}>
            <FontAwesomeIcon icon={faHeart} />
            Wishlist (2)
          </Button>
          <Button style={BTN_TYPE.PRIMARY}>
            <FontAwesomeIcon icon={faShoppingCart} />
            Cart (3)
          </Button>
          <Button style={BTN_TYPE.PRIMARY}>
            <FontAwesomeIcon icon={faSignInAlt} />
            Sign in
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
