import React from "react";
import styles from "./Header.module.css";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
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
            <FontAwesomeIcon icon={faSignInAlt} />
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
