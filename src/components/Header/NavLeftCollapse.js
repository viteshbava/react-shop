import { useEffect } from "react";
import localStyles from "./NavLeftCollapse.module.css";
import globalStyles from "./_NavGlobal.module.css";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import Button from "../UI/Button/Button";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLeftCollapse = ({ close }) => {
  const ctx = useContext(AuthContext);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const overlayClickHandler = (e) => {
    if (!close) return;
    if (e.target === e.currentTarget) close();
  };

  const navLinkActive = ({ isActive }) =>
    globalStyles.navlink +
    (isActive ? ` ${globalStyles["navlink--active"]}` : "");

  const onSignOutHandler = () => {
    ctx.onLogout();
    navigate("/");
    close();
  };

  return (
    <>
      <div onClick={overlayClickHandler} className={localStyles.overlay}></div>
      <div className={localStyles.wrapper}>
        <div className={localStyles.container}>
          <div className={localStyles.header}>
            <Logo />
            <button onClick={close} className={localStyles.close}>
              &times;
            </button>
          </div>

          <nav className={localStyles.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <>
                  <li>
                    <NavLink
                      onClick={close}
                      to={"/cart"}
                      className={navLinkActive}
                    >
                      <Icon icon={ICON_TYPE.CART} />
                      Cart ({cartTotalQty === null ? "SP!" : cartTotalQty})
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={close}
                      to={"/wishlist"}
                      className={navLinkActive}
                    >
                      <Icon icon={ICON_TYPE.HEART_FULL} />
                      Wishlist (
                      {wishlistTotalQty === null ? "SP!" : wishlistTotalQty})
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  onClick={close}
                  to={"/about"}
                  className={navLinkActive}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink onClick={close} to={"/help"} className={navLinkActive}>
                  Help
                </NavLink>
              </li>
            </ul>
          </nav>
          <ul className={localStyles.actions}>
            {ctx.isLoggedIn && (
              <li>
                <Button onClick={onSignOutHandler} variant={"outlined"}>
                  <Icon icon={ICON_TYPE.SIGNOUT} />
                  Sign out
                </Button>
              </li>
            )}
            {!ctx.isLoggedIn && (
              <>
                <li>
                  <Button onClick={close} variant={"outlined"} link="/register">
                    <Icon icon={ICON_TYPE.REGISTER} />
                    Register
                  </Button>
                </li>
                <li>
                  <Button onClick={close} link="/signin">
                    <Icon icon={ICON_TYPE.SIGNIN} />
                    Sign in
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavLeftCollapse;
