import React from "react";
import { useState, useContext } from "react";
import styles from "./Header.module.css";
import NavMobileLeft from "./NavMobileLeft";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import Badge from "../UI/Badge/Badge";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import AuthContext from "../../context/auth-context";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showMobileCollapseNav, setShowMobileCollapseNav] = useState(false);
  const cartIsUpdating = useSelector((state) => state.cart.isUpdating);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const hamburgerClickHandler = () => {
    setShowMobileCollapseNav((prev) => !prev);
  };

  const onSignOutHandler = () => {
    ctx.onLogout();
    setShowMobileCollapseNav(false);
    navigate("/");
  };

  const NavMobileCollapse = () => (
    <nav className={styles["nav-mobile-collapse"]}>
      <ul>
        {ctx.isLoggedIn ? (
          <>
            <li>
              <Link to="/wishlist">
                <Icon icon={ICON_TYPE.HEART_FULL} /> Wishlist (3)
              </Link>
            </li>
            <li>
              <button onClick={onSignOutHandler}>
                <Icon icon={ICON_TYPE.SIGNOUT} /> Sign out
              </button>
            </li>
          </>
        ) : (
          <li>
            <a href="/signin">
              <Icon icon={ICON_TYPE.SIGNIN} /> Sign in
            </a>
          </li>
        )}
      </ul>
    </nav>
  );

  const NavDesktop = () => (
    <nav className={styles["nav-desktop"]}>
      <ul>
        {ctx.isLoggedIn ? (
          <>
            <li>
              <Button style={BTN_TYPE.SECONDARY} onClick={onSignOutHandler}>
                <Icon icon={ICON_TYPE.SIGNOUT} />
                Sign out
              </Button>
            </li>
            <li>
              <Button link="/wishlist" style={BTN_TYPE.SECONDARY}>
                <Icon icon={ICON_TYPE.HEART_FULL} />
                Wishlist (2)
              </Button>
            </li>
            <li>
              <Button link="/cart" style={BTN_TYPE.PRIMARY}>
                <Icon icon={ICON_TYPE.CART} />
                Cart ({cartIsUpdating ? "SP!" : cartTotalQty})
              </Button>
            </li>
          </>
        ) : (
          <li>
            <Button link="/signin" style={BTN_TYPE.PRIMARY}>
              <Icon icon={ICON_TYPE.SIGNIN} />
              Sign in
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );

  const NavMobileRight = () => (
    <nav className={styles["nav-mobile-right"]}>
      <a className={styles["nav-mobile-right__cart-icon"]} href="/cart">
        <Icon icon={ICON_TYPE.CART} />
        <Badge className={styles["nav-mobile-right__qty-badge"]}>99+</Badge>
      </a>
    </nav>
  );

  return (
    <header>
      <div className={`container ${styles.wrapper}`}>
        <NavMobileLeft
          className={styles["nav-mobile-left"]}
          hamburgerClickHandler={hamburgerClickHandler}
          showMobileCollapseNav={showMobileCollapseNav}
        />
        <div className={styles.logo}>
          <Link to="/">React Shop</Link>
        </div>
        <NavDesktop />
        <NavMobileRight />
        {showMobileCollapseNav && <NavMobileCollapse />}
      </div>
    </header>
  );
};

export default Header;
