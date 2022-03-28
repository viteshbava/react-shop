import { useEffect, useRef } from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import localStyles from './NavLeftCollapse.module.css';
import globalStyles from '../_NavGlobal.module.css';

import SignedInInfo from '../SignedInInfo/SignedInInfo';
import Logo from '../Logo/Logo';

import SignedInActions from './SignedInActions';
import SignedOutActions from './SignedOutActions';
import SignedInMenu from './SignedInMenu';

const NavLeftCollapse = ({ close }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const focusRef = useRef();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    focusRef.current.focus();
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

          {loggedInUser && (
            <SignedInInfo className={localStyles['signed-in-info']} />
          )}

          <nav className={localStyles.nav}>
            <ul>
              {loggedInUser && <SignedInMenu close={close} />}
              <li>
                <NavLink onClick={close} to="/about" className={navLinkActive}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink onClick={close} to="/help" className={navLinkActive}>
                  Help
                </NavLink>
              </li>
            </ul>
          </nav>
          <ul className={localStyles.actions}>
            {loggedInUser ? (
              <SignedInActions close={close} />
            ) : (
              <SignedOutActions close={close} />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

NavLeftCollapse.propTypes = {
  close: PropTypes.func.isRequired,
};

export default NavLeftCollapse;
