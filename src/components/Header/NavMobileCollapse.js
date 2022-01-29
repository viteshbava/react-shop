import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { Link } from "react-router-dom";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import styles from "./NavMobileCollapse.module.css";

const NavMobileCollapse = ({ className, onSignOutHandler }) => {
  const ctx = useContext(AuthContext);
  const navClasses = `${className} ${styles.wrapper}`;

  return (
    <nav className={navClasses}>
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
};

export default NavMobileCollapse;
