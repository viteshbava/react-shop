import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import localStyles from './NavLeftCollapse.module.css';

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
        className={localStyles.overlay}
        type="fade"
      >
        <div onClick={overlayClickHandler} aria-hidden="true" />
      </Animate>
      <Animate
        isMounted={showMenu}
        enterTime={200}
        exitTime={200}
        className={localStyles.wrapper}
        type="slide-from-left"
        focusRef={focusRef}
      >
        <div
          ref={focusRef}
          tabIndex={-1}
          onKeyDown={keyDownHandler}
          role="menu"
        >
          <div className={localStyles.container}>
            <div className={localStyles.header}>
              <Logo onClick={close} />
              <button
                type="button"
                onClick={close}
                className={localStyles.close}
              >
                &times;
              </button>
            </div>
            <SignedInInfo className={localStyles['signed-in-info']} />
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
