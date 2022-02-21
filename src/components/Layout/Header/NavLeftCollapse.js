import { useEffect, useContext } from "react";

import localStyles from "./NavLeftCollapse.module.css";
import globalStyles from "./_NavGlobal.module.css";

import Logo from "./Logo";
import Button from "../../UI/Button/Button";
import Icon, { ICON_TYPE } from "../../UI/Icon/Icon";

import AuthContext from "../../../context/auth-context";
import { useNavigate, NavLink } from "react-router-dom";
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
            <Logo onClick={close} />
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
                      Cart{cartTotalQty !== null && ` (${cartTotalQty})`}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={close}
                      to={"/wishlist"}
                      className={navLinkActive}
                    >
                      <Icon
                        icon={
                          wishlistTotalQty
                            ? ICON_TYPE.HEART_FULL
                            : ICON_TYPE.HEART_EMPTY
                        }
                      />
                      Wishlist
                      {wishlistTotalQty !== null && ` (${wishlistTotalQty})`}
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
                <Button
                  onClick={onSignOutHandler}
                  icon={<Icon icon={ICON_TYPE.SIGNOUT} />}
                  variant={"outlined"}
                >
                  Sign out
                </Button>
              </li>
            )}
            {!ctx.isLoggedIn && (
              <>
                <li>
                  <Button
                    onClick={close}
                    icon={<Icon icon={ICON_TYPE.REGISTER} />}
                    variant={"outlined"}
                    link="/register"
                  >
                    Register
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={close}
                    icon={<Icon icon={ICON_TYPE.SIGNIN} />}
                    link="/signin"
                  >
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
