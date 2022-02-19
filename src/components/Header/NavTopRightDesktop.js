import localStyles from "./NavTopRightDesktop.module.css";
import globalStyles from "./_NavGlobal.module.css";
import Button from "../UI/Button/Button";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import CartButton from "./CartButton";
import { useSelector } from "react-redux";

const NavTopRightDesktop = ({ className }) => {
  const ctx = useContext(AuthContext);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);

  const navigate = useNavigate();
  const navClasses = localStyles.wrapper + (className ? ` ${className}` : "");

  const navLinkActive = ({ isActive }) =>
    globalStyles.navlink +
    (isActive ? ` ${globalStyles["navlink--active"]}` : "");

  const onSignOutHandler = () => {
    ctx.onLogout();
    navigate("/");
  };

  const nav_signed_out = (
    <>
      <li className={localStyles["ml-extra"]}>
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

  const nav_signed_in = (
    <>
      <li className={localStyles["flex-first"]}>
        <button className={globalStyles.navlink} onClick={onSignOutHandler}>
          <Icon icon={ICON_TYPE.SIGNOUT} />
          Sign out
        </button>
      </li>
      <li>
        <NavLink to={"/wishlist"} className={navLinkActive}>
          <Icon icon={ICON_TYPE.HEART_FULL} />
          Wishlist ({wishlistTotalQty === null ? "SP!" : wishlistTotalQty})
        </NavLink>
      </li>
      <li>
        <Button variant={cartTotalQty === 0 && "outlined"} link="/cart">
          <Icon icon={ICON_TYPE.CART} />
          Cart ({cartTotalQty === null ? "SP!" : cartTotalQty})
        </Button>
      </li>
    </>
  );

  return (
    <nav className={navClasses}>
      <ul>
        <li>
          <NavLink to={"/help"} className={navLinkActive}>
            Help
          </NavLink>
        </li>
        <li>
          <NavLink to={"/about"} className={navLinkActive}>
            About
          </NavLink>
        </li>
        {ctx.isLoggedIn ? nav_signed_in : nav_signed_out}
      </ul>
    </nav>
  );
};

export default NavTopRightDesktop;
