import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import { useSelector } from "react-redux";

import styles from "./NavDesktop.module.css";

const NavDesktop = ({ className, onSignOutHandler }) => {
  const ctx = useContext(AuthContext);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);

  const navClasses = styles.wrapper + (className ? ` ${className}` : "");

  return (
    <nav className={navClasses}>
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
                Cart ({cartTotalQty === null ? "SP!" : cartTotalQty})
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
};

export default NavDesktop;
