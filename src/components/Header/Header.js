import React from "react";
import { useState, useContext } from "react";
import styles from "./Header.module.css";
import NavTopLeft from "./NavTopLeft";
import NavTopRightDesktop from "./NavTopRightDesktop";
import NavTopRightMobile from "./NavTopRightMobile";
import NavMobileRight from "./NavMobileRight";
import NavLeftCollapse from "./NavLeftCollapse";
import NavDesktop from "./NavDesktop";
import AuthContext from "../../context/auth-context";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [showNavLeftCollapse, setShowNavLeftCollapse] = useState(false);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleLeftNav = () => setShowNavLeftCollapse((prev) => !prev);

  const onSignOutHandler = () => {
    ctx.onLogout();
    setShowNavLeftCollapse(false);
    navigate("/");
  };

  return (
    <header>
      <div className={`container ${styles.wrapper}`}>
        <NavTopLeft hamburgerClickHandler={toggleLeftNav} />
        <NavTopRightDesktop className={styles["nav-top-right-desktop"]} />
        <NavTopRightMobile className={styles["nav-top-right-mobile"]} />
        {showNavLeftCollapse && <NavLeftCollapse close={toggleLeftNav} />}
        {/* <NavDesktop
          className={styles["nav-desktop"]}
          onSignOutHandler={onSignOutHandler}
        /> */}
        {/* <NavMobileRight className={styles["nav-mobile-right"]} /> */}
        {/* {showMobileCollapseNav && (
          <NavMobileCollapse
            className={styles["nav-mobile-collapse"]}
            onSignOutHandler={onSignOutHandler}
          />
        )} */}
      </div>
    </header>
  );
};

export default Header;
