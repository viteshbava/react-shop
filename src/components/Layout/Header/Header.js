import React from "react";
import { useState } from "react";
import styles from "./Header.module.css";
import NavTopLeft from "./NavTopLeft";
import NavTopRightDesktop from "./NavTopRightDesktop";
import NavTopRightMobile from "./NavTopRightMobile";
import NavLeftCollapse from "./NavLeftCollapse";

const Header = () => {
  const [showNavLeftCollapse, setShowNavLeftCollapse] = useState(false);

  const toggleLeftNav = () => setShowNavLeftCollapse((prev) => !prev);

  return (
    <header>
      <div className={`container ${styles.wrapper}`}>
        <NavTopLeft hamburgerClickHandler={toggleLeftNav} />
        <NavTopRightDesktop className={styles["nav-top-right-desktop"]} />
        <NavTopRightMobile className={styles["nav-top-right-mobile"]} />
        {showNavLeftCollapse && <NavLeftCollapse close={toggleLeftNav} />}
      </div>
    </header>
  );
};

export default Header;