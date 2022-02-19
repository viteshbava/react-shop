import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button/Button";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./NavDesktop.module.css";

const NavDesktop = ({ className, onSignOutHandler }) => {
  const ctx = useContext(AuthContext);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);

  const navClasses = styles.wrapper + (className ? ` ${className}` : "");

  const links_authenticated = (
    <>
      <li className={styles["flex-first"]}>
        <button className={styles.navlink} onClick={onSignOutHandler}>
          <Icon icon={ICON_TYPE.SIGNOUT} />
          Sign out
        </button>
      </li>
      <li>
        <NavLink
          to={"/wishlist"}
          className={({ isActive }) =>
            styles.navlink + (isActive ? ` ${styles["navlink--active"]}` : "")
          }
        >
          <Icon icon={ICON_TYPE.HEART_FULL} />
          Wishlist ({wishlistTotalQty === null ? "SP!" : wishlistTotalQty})
        </NavLink>
      </li>
      <li className={styles["ml-extra"]}>
        <Button variant={cartTotalQty === 0 && "outlined"} link="/cart">
          <Icon icon={ICON_TYPE.CART} />
          Cart ({cartTotalQty === null ? "SP!" : cartTotalQty})
        </Button>
      </li>
    </>
  );

  const link_signed_out = (
    <>
      <li className={styles["ml-extra"]}>
        <Button variant={"outlined"} link="/register">
          <Icon icon={ICON_TYPE.REGISTER} />
          Register
        </Button>
      </li>
      <li>
        <Button link="/signin">
          <Icon icon={ICON_TYPE.SIGNIN} />
          Sign in
        </Button>
      </li>
    </>
  );

  return (
    <nav className={navClasses}>
      <ul>
        <li>
          <NavLink
            to={"/help"}
            className={({ isActive }) =>
              styles.navlink + (isActive ? ` ${styles["navlink--active"]}` : "")
            }
          >
            Help
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              styles.navlink + (isActive ? ` ${styles["navlink--active"]}` : "")
            }
          >
            About
          </NavLink>
        </li>
        {ctx.isLoggedIn ? links_authenticated : link_signed_out}
      </ul>
    </nav>
  );
};

export default NavDesktop;
