import styles from "./NavTopRightMobile.module.css";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import { NavLink } from "react-router-dom";
import Badge from "../UI/Badge/Badge";
import { useSelector } from "react-redux";

const NavTopRightMobile = ({ className }) => {
  const ctx = useContext(AuthContext);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);

  const navLinkActive = ({ isActive }) => (isActive ? styles.active : "");

  const navClasses = styles.wrapper + (className ? ` ${className}` : "");

  const nav_signed_out = (
    <>
      <li>
        <NavLink title="Register" className={navLinkActive} to={"/register"}>
          <Icon icon={ICON_TYPE.REGISTER} />
        </NavLink>
      </li>
      <li>
        <NavLink title="Sign in" className={navLinkActive} to={"/signin"}>
          <Icon icon={ICON_TYPE.SIGNIN} />
        </NavLink>
      </li>
    </>
  );

  const nav_signed_in = (
    <>
      <li>
        <NavLink title="Wishlist" className={navLinkActive} to={"/wishlist"}>
          <Icon icon={ICON_TYPE.HEART_FULL} badge={wishlistTotalQty} />
        </NavLink>
      </li>
      <li>
        <NavLink title="Cart" className={navLinkActive} to={"/cart"}>
          <Icon icon={ICON_TYPE.CART} badge={cartTotalQty} />
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className={navClasses}>
      <ul>{ctx.isLoggedIn ? nav_signed_in : nav_signed_out}</ul>
    </nav>
  );
};

export default NavTopRightMobile;
