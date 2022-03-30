import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import localStyles from './NavLeftCollapse.module.css';

import SignedInInfo from '../SignedInInfo/SignedInInfo';
import Logo from '../Logo/Logo';

import NavLeftActions from './NavLeftActions';
import NavLeftMenu from './NavLeftMenu';

const NavLeftCollapse = ({ showMenu, close }) => {
  const focusRef = useRef();
  const nodeRef = useRef();

  useEffect(() => {
    if (showMenu) {
      // remove scroll bar from body
      document.body.style.overflow = 'hidden';
      // focus on the menu so we can close it and tab through its contents
      if (focusRef?.current) focusRef.current.focus();
    }
    // NOTE: instead of a return statement here to add scroll bar back to body, we have it on the onExited prop in the CSSTransition below
  }, [showMenu]);

  const overlayClickHandler = (e) => {
    if (e.target === e.currentTarget) close();
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Escape') close();
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      in={showMenu}
      timeout={200}
      classNames={{
        enter: '',
        enterActive: localStyles.enterActive,
        exit: '',
        exitActive: localStyles.exitActive,
      }}
      onExited={() => {
        document.body.style.overflow = 'auto';
      }}
    >
      <div
        ref={nodeRef}
        onClick={overlayClickHandler}
        onKeyDown={keyDownHandler}
        className={localStyles.overlay}
        aria-hidden="true"
      >
        <div tabIndex={-1} ref={focusRef} className={localStyles.wrapper}>
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
      </div>
    </CSSTransition>
  );
};

NavLeftCollapse.propTypes = {
  close: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
};

export default NavLeftCollapse;
