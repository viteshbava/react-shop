import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './NavTopRightMobile.module.css';
import Icon, { ICON_TYPE } from '../../../UI/Icon/Icon';
import SignedInInfo from '../SignedInInfo/SignedInInfo';

const NavTopRightMobile = ({ className }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);

  const navLinkActive = ({ isActive }) => (isActive ? styles.active : '');

  const navClasses = styles.wrapper + (className ? ` ${className}` : '');

  const navSignedOut = (
    <>
      <li>
        <NavLink title="Register" className={navLinkActive} to="/register">
          <Icon icon={ICON_TYPE.REGISTER} />
        </NavLink>
      </li>
      <li>
        <NavLink title="Sign in" className={navLinkActive} to="/signin">
          <Icon icon={ICON_TYPE.SIGNIN} />
        </NavLink>
      </li>
    </>
  );

  const navSignedIn = (
    <>
      <li>
        <NavLink title="Wishlist" className={navLinkActive} to="/wishlist">
          <Icon
            icon={ICON_TYPE.HEART_FULL}
            badge={wishlistTotalQty !== null && `${wishlistTotalQty}`}
          />
        </NavLink>
      </li>
      <li>
        <NavLink title="Cart" className={navLinkActive} to="/cart">
          <Icon
            icon={ICON_TYPE.CART}
            badge={cartTotalQty !== null && `${cartTotalQty}`}
          />
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className={navClasses}>
      {loggedInUser && <SignedInInfo className={styles['signed-in-info']} />}
      <ul>{loggedInUser ? navSignedIn : navSignedOut}</ul>
    </nav>
  );
};

NavTopRightMobile.propTypes = {
  className: PropTypes.string,
};
NavTopRightMobile.defaultProps = {
  className: null,
};

export default NavTopRightMobile;
