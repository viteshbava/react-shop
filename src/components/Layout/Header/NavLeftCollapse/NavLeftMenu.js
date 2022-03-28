import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import NavAuthItem from '../NavAuthItem';
import { useSelector } from 'react-redux';
import Icon, { ICON_TYPE } from '../../../UI/Icon/Icon';
import globalStyles from '../_NavGlobal.module.css';
import localStyles from './NavLeftMenu.module.css';

const NavLeftMenu = ({ close }) => {
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const navLinkActive = ({ isActive }) =>
    globalStyles.navlink +
    (isActive ? ` ${globalStyles['navlink--active']}` : '');

  return (
    <nav className={localStyles.wrapper}>
      <ul>
        <NavAuthItem authRequired>
          <li>
            <NavLink onClick={close} to="/cart" className={navLinkActive}>
              <Icon icon={ICON_TYPE.CART} />
              Cart{cartTotalQty !== null && ` (${cartTotalQty})`}
            </NavLink>
          </li>
          <li>
            <NavLink onClick={close} to="/wishlist" className={navLinkActive}>
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
            <NavLink onClick={close} to="/settings" className={navLinkActive}>
              Settings
            </NavLink>
          </li>
        </NavAuthItem>
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
  );
};

NavLeftMenu.propTypes = {
  close: PropTypes.func.isRequired,
};

export default NavLeftMenu;
