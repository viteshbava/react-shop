import localStyles from "./NavTopRightDesktop.module.css";
import globalStyles from "./_NavGlobal.module.css";
import SignedInInfo from "./SignedInInfo";
import Button from "../../UI/Button/Button";
import Icon, { ICON_TYPE } from "../../UI/Icon/Icon";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavTopRightDesktop = ({ className }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);

  const navClasses = localStyles.wrapper + (className ? ` ${className}` : "");

  const navLinkActive = ({ isActive }) =>
    globalStyles.navlink +
    (isActive ? ` ${globalStyles["navlink--active"]}` : "");

  const nav_signed_out = (
    <>
      <li className={localStyles["ml-extra"]}>
        <Button
          variant={"outlined"}
          icon={<Icon icon={ICON_TYPE.REGISTER} />}
          link="/register"
        >
          Register
        </Button>
      </li>
      <li>
        <Button icon={<Icon icon={ICON_TYPE.SIGNIN} />} link="/signin">
          Sign in
        </Button>
      </li>
    </>
  );

  const nav_signed_in = (
    <>
      <li>
        <NavLink to={"/wishlist"} className={navLinkActive}>
          <Icon
            icon={
              wishlistTotalQty ? ICON_TYPE.HEART_FULL : ICON_TYPE.HEART_EMPTY
            }
          />
          Wishlist{wishlistTotalQty !== null && ` (${wishlistTotalQty})`}
        </NavLink>
      </li>
      <li>
        <Button
          variant={!cartTotalQty && "outlined"}
          icon={<Icon icon={ICON_TYPE.CART} />}
          link="/cart"
        >
          Cart{cartTotalQty !== null && ` (${cartTotalQty})`}
        </Button>
      </li>
    </>
  );

  return (
    <nav className={navClasses}>
      <SignedInInfo />
      <ul>{loggedInUser ? nav_signed_in : nav_signed_out}</ul>
    </nav>
  );
};

export default NavTopRightDesktop;
