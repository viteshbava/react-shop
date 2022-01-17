import React from "react";
import { useState } from "react";
import styles from "./Header.module.css";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import Badge from "../UI/Badge/Badge";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";

const Header = () => {
  const [showMobileCollapseNav, setShowMobileCollapseNav] = useState(false);

  const hamburgerClickHandler = () => {
    setShowMobileCollapseNav((prev) => !prev);
  };

  const navMobileCollapse = (
    <nav className={styles["nav-mobile-collapse"]}>
      <ul>
        <li>
          <button>
            <Icon icon={ICON_TYPE.HEART_FULL} /> Wishlist (3)
          </button>
        </li>
        <li>
          <button>
            <Icon icon={ICON_TYPE.SIGNOUT} /> Sign out
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <header>
      <div className={`container ${styles.wrapper}`}>
        <nav className={styles["nav-mobile-left"]}>
          <button onClick={hamburgerClickHandler}>
            <Icon
              icon={
                showMobileCollapseNav ? ICON_TYPE.TIMES : ICON_TYPE.HAMBURGER
              }
            />
          </button>
        </nav>

        <div className={styles.logo}>React Shop</div>
        <nav className={styles["nav-desktop"]}>
          <ul>
            <li>
              <Button style={BTN_TYPE.SECONDARY}>
                <Icon icon={ICON_TYPE.SIGNOUT} />
                Sign out
              </Button>
            </li>
            <li>
              <Button style={BTN_TYPE.SECONDARY}>
                <Icon icon={ICON_TYPE.HEART_FULL} />
                Wishlist (2)
              </Button>
            </li>
            <li>
              <Button style={BTN_TYPE.PRIMARY}>
                <Icon icon={ICON_TYPE.CART} />
                Cart (3)
              </Button>
            </li>
            {/* <li>
              <Button style={BTN_TYPE.PRIMARY}>
                <Icon icon={ICON_TYPE.SIGNIN} />
                Sign in
              </Button>
            </li> */}
          </ul>
        </nav>
        <nav className={styles["nav-mobile-right"]}>
          <button className={styles["nav-mobile-right__cart-icon"]}>
            <Icon icon={ICON_TYPE.CART} />
            <Badge className={styles["nav-mobile-right__qty-badge"]}>99+</Badge>
          </button>
        </nav>
        {showMobileCollapseNav ? navMobileCollapse : <></>}
      </div>
    </header>
  );
};

export default Header;
