import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import styles from './NavLeftCollapse.module.css';

import SignedInInfo from '../SignedInInfo/SignedInInfo';
import Logo from '../Logo/Logo';

import NavLeftActions from './NavLeftActions';
import NavLeftMenu from './NavLeftMenu';
import Animate from '../../../UI/Animate/Animate';

const NavLeftCollapse = ({ showMenu, close }) => {
  const focusRef = useRef();

  useEffect(() => {
    if (showMenu) {
      // remove scroll bar from body
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMenu]);

  const overlayClickHandler = (e) => {
    if (e.target === e.currentTarget) close();
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Escape') close();
  };

  return (
    <>
      <Animate
        isMounted={showMenu}
        enterTime={200}
        exitTime={200}
        animation="fade"
      >
        <div
          onClick={overlayClickHandler}
          aria-hidden="true"
          className={styles.overlay}
        />
      </Animate>
      <Animate
        isMounted={showMenu}
        enterTime={200}
        exitTime={200}
        animation={{
          enter: styles['enter-animate'],
          exit: styles['exit-animate'],
        }}
        focusRef={focusRef}
      >
        <div
          ref={focusRef}
          tabIndex={-1}
          onKeyDown={keyDownHandler}
          role="menu"
          className={styles.wrapper}
        >
          <div className={styles.container}>
            <div className={styles.header}>
              <Logo onClick={close} />
              <button type="button" onClick={close} className={styles.close}>
                &times;
              </button>
            </div>
            <SignedInInfo className={styles['signed-in-info']} />
            <NavLeftMenu close={close} />
            <NavLeftActions close={close} />
          </div>
        </div>
      </Animate>
    </>
  );
};

NavLeftCollapse.propTypes = {
  close: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
};

export default NavLeftCollapse;
