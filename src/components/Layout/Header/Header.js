import { useState } from 'react';
import styles from './Header.module.css';
import NavTopLeft from './NavTopLeft/NavTopLeft';
import NavTopRightDesktop from './NavTopRight/NavTopRightDesktop';
import NavTopRightMobile from './NavTopRight/NavTopRightMobile';
import NavLeftCollapse from './NavLeftCollapse/NavLeftCollapse';

const Header = () => {
  const [showNavLeftCollapse, setShowNavLeftCollapse] = useState(false);

  const toggleLeftNav = () => setShowNavLeftCollapse((prev) => !prev);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.wrapper}`}>
        <NavTopLeft hamburgerClickHandler={toggleLeftNav} />
        <NavTopRightDesktop />
        <NavTopRightMobile />
        <NavLeftCollapse showMenu={showNavLeftCollapse} close={toggleLeftNav} />
      </div>
    </header>
  );
};

export default Header;
