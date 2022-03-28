import { useEffect, useRef } from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import localStyles from './NavLeftCollapse.module.css';
import globalStyles from '../_NavGlobal.module.css';

import SignedInInfo from '../SignedInInfo/SignedInInfo';
import Logo from '../Logo/Logo';

import NavLeftActions from './NavLeftActions';
import SignedOutActions from './SignedOutActions';
import NavLeftMenu from './NavLeftMenu';

const NavLeftCollapse = ({ showMenu, close }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const focusRef = useRef();
  const nodeRef = useRef();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (focusRef?.current) focusRef.current.focus();
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const overlayClickHandler = (e) => {
    if (e.target === e.currentTarget) close();
  };

  const navLinkActive = ({ isActive }) =>
    globalStyles.navlink +
    (isActive ? ` ${globalStyles['navlink--active']}` : '');

  const keyDownHandler = (e) => {
    if (e.key === 'Escape') close();
  };

  if (!showMenu) return null;

  return (
    <div
      onClick={overlayClickHandler}
      onKeyDown={keyDownHandler}
      className={localStyles.overlay}
      aria-hidden="true"
    >
      <div tabIndex={-1} className={localStyles.wrapper}>
        <div className={localStyles.container}>
          <div className={localStyles.header}>
            <Logo onClick={close} />
            <button
              ref={focusRef}
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
      {/* <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showMenu}
        timeout={1000}
        classNames={{
          enter: localStyles.openMenu,
          enterActive: localStyles.openMenu,
          exit: localStyles.openMenu,
          exitActive: localStyles.openMenu,
        }}
      >
        
      </CSSTransition> */}
    </div>
  );
};

NavLeftCollapse.propTypes = {
  close: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
};

export default NavLeftCollapse;

{
  /* <button type="button" onClick={() => setShowThing((prev) => !prev)}>
Toggle
</button> */
}

{
  /* <CSSTransition
nodeRef={nodeRef}
mountOnEnter
unmountOnExit
in={showThing}
timeout={500}
classNames={{
  enter: '',
  enterActive: localStyles.openMenu,
  exit: '',
  exitActive: 'ModalClosed',
}}
>
<div ref={nodeRef} className={localStyles.wrapper}>
  <h1>A Modal</h1>
</div>
</CSSTransition> */
}
