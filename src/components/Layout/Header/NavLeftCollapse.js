import { useEffect, useRef } from 'react';

import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import localStyles from './NavLeftCollapse.module.css';
import globalStyles from './_NavGlobal.module.css';

import SignedInInfo from './SignedInInfo';
import Logo from './Logo';
import Button from '../../UI/Button/Button';
import Icon, { ICON_TYPE } from '../../UI/Icon/Icon';

import { logout } from '../../../redux/actions/auth-actions';
import { uiActions } from '../../../redux/slices/ui-slice';
import { ALERT_TYPE } from '../../Feedback/Alert/Alert';

const NavLeftCollapse = ({ close }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const onSignOutHandler = async () => {
    dispatch(
      logout({
        onSuccess: () => {
          navigate('/');
          close();
        },
        onError: () =>
          dispatch(
            uiActions.addAlert({
              type: ALERT_TYPE.ERROR,
              title: 'Sign out fail',
              message: 'Failed to sign out!',
            })
          ),
      })
    );
  };

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
              {loggedInUser && (
                <>
                  <li>
                    <NavLink
                      onClick={close}
                      to="/cart"
                      className={navLinkActive}
                    >
                      <Icon icon={ICON_TYPE.CART} />
                      Cart{cartTotalQty !== null && ` (${cartTotalQty})`}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={close}
                      to="/wishlist"
                      className={navLinkActive}
                    >
                      <Icon
                        icon={
                          wishlistTotalQty
                            ? ICON_TYPE.HEART_FULL
                            : ICON_TYPE.HEART_EMPTY
                        }
                      />
                      Wishlist
                      {wishlistTotalQty !== null && ` (${wishlistTotalQty})`}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={close}
                      to="/settings"
                      className={navLinkActive}
                    >
                      Settings
                    </NavLink>
                  </li>
                </>
              )}
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
            {loggedInUser && (
              <li>
                <Button
                  onClick={onSignOutHandler}
                  icon={<Icon icon={ICON_TYPE.SIGNOUT} />}
                  variant="outlined"
                >
                  Sign out
                </Button>
              </li>
            )}
            {!loggedInUser && (
              <>
                <li>
                  <Button
                    onClick={close}
                    icon={<Icon icon={ICON_TYPE.REGISTER} />}
                    variant="outlined"
                    link="/register"
                  >
                    Register
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={close}
                    icon={<Icon icon={ICON_TYPE.SIGNIN} />}
                    link="/signin"
                  >
                    Sign in
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div
  //       tabIndex={-1}
  //       onClick={overlayClickHandler}
  //       onKeyDown={keyDownHandler}
  //       className={localStyles.overlay}
  //       aria-hidden="true"
  //     />
  //     <div className={localStyles.wrapper}>
  //       <div className={localStyles.container}>
  //         <div className={localStyles.header}>
  //           <Logo onClick={close} />
  //           <button type="button" onClick={close} className={localStyles.close}>
  //             &times;
  //           </button>
  //         </div>

  //         {loggedInUser && (
  //           <SignedInInfo className={localStyles['signed-in-info']} />
  //         )}

  //         <nav className={localStyles.nav}>
  //           <ul>
  //             {loggedInUser && (
  //               <>
  //                 <li>
  //                   <NavLink
  //                     onClick={close}
  //                     to="/cart"
  //                     className={navLinkActive}
  //                   >
  //                     <Icon icon={ICON_TYPE.CART} />
  //                     Cart{cartTotalQty !== null && ` (${cartTotalQty})`}
  //                   </NavLink>
  //                 </li>
  //                 <li>
  //                   <NavLink
  //                     onClick={close}
  //                     to="/wishlist"
  //                     className={navLinkActive}
  //                   >
  //                     <Icon
  //                       icon={
  //                         wishlistTotalQty
  //                           ? ICON_TYPE.HEART_FULL
  //                           : ICON_TYPE.HEART_EMPTY
  //                       }
  //                     />
  //                     Wishlist
  //                     {wishlistTotalQty !== null && ` (${wishlistTotalQty})`}
  //                   </NavLink>
  //                 </li>
  //                 <li>
  //                   <NavLink
  //                     onClick={close}
  //                     to="/settings"
  //                     className={navLinkActive}
  //                   >
  //                     Settings
  //                   </NavLink>
  //                 </li>
  //               </>
  //             )}
  //             <li>
  //               <NavLink onClick={close} to="/about" className={navLinkActive}>
  //                 About
  //               </NavLink>
  //             </li>
  //             <li>
  //               <NavLink onClick={close} to="/help" className={navLinkActive}>
  //                 Help
  //               </NavLink>
  //             </li>
  //           </ul>
  //         </nav>
  //         <ul className={localStyles.actions}>
  //           {loggedInUser && (
  //             <li>
  //               <Button
  //                 onClick={onSignOutHandler}
  //                 icon={<Icon icon={ICON_TYPE.SIGNOUT} />}
  //                 variant="outlined"
  //               >
  //                 Sign out
  //               </Button>
  //             </li>
  //           )}
  //           {!loggedInUser && (
  //             <>
  //               <li>
  //                 <Button
  //                   onClick={close}
  //                   icon={<Icon icon={ICON_TYPE.REGISTER} />}
  //                   variant="outlined"
  //                   link="/register"
  //                 >
  //                   Register
  //                 </Button>
  //               </li>
  //               <li>
  //                 <Button
  //                   onClick={close}
  //                   icon={<Icon icon={ICON_TYPE.SIGNIN} />}
  //                   link="/signin"
  //                 >
  //                   Sign in
  //                 </Button>
  //               </li>
  //             </>
  //           )}
  //         </ul>
  //       </div>
  //     </div>
  //   </>
  // );
};

NavLeftCollapse.propTypes = {
  close: PropTypes.func.isRequired,
};

export default NavLeftCollapse;
