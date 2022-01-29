import React from "react";
import { useState, useContext } from "react";
import styles from "./Header.module.css";
import NavMobileLeft from "./NavMobileLeft";
import NavMobileRight from "./NavMobileRight";
import NavMobileCollapse from "./NavMobileCollapse";
import NavDesktop from "./NavDesktop";
import AuthContext from "../../context/auth-context";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [showMobileCollapseNav, setShowMobileCollapseNav] = useState(false);
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
        <NavDesktop
          className={styles["nav-desktop"]}
          onSignOutHandler={onSignOutHandler}
        />
        <NavMobileRight className={styles["nav-mobile-right"]} />
        {showMobileCollapseNav && (
          <NavMobileCollapse
            className={styles["nav-mobile-collapse"]}
            onSignOutHandler={onSignOutHandler}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
