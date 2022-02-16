import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button/Button";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import { useSelector } from "react-redux";

import styles from "./NavDesktop.module.css";

const NavDesktop = ({ className, onSignOutHandler }) => {
  const ctx = useContext(AuthContext);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);

  const navClasses = styles.wrapper + (className ? ` ${className}` : "");

  return (
    <nav className={navClasses}>
      <ul>
        {ctx.isLoggedIn ? (
          <>
            <li>
              <Button variant="outlined" onClick={onSignOutHandler}>
                <Icon icon={ICON_TYPE.SIGNOUT} />
                Sign out
              </Button>
            </li>
            <li>
              <Button variant="outlined" link="/wishlist">
                <Icon icon={ICON_TYPE.HEART_FULL} />
                Wishlist ({wishlistTotalQty === null ? "SP!" : wishlistTotalQty}
                )
              </Button>
            </li>
            <li>
              <Button variant={cartTotalQty === 0 && "outlined"} link="/cart">
                <Icon icon={ICON_TYPE.CART} />
                Cart ({cartTotalQty === null ? "SP!" : cartTotalQty})
              </Button>
            </li>
          </>
        ) : (
          <li>
            <Button link="/signin">
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
