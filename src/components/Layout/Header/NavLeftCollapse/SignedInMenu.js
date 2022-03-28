import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon, { ICON_TYPE } from '../../../UI/Icon/Icon';
import globalStyles from '../_NavGlobal.module.css';

const SignedInMenu = ({ close }) => {
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);

  const navLinkActive = ({ isActive }) =>
    globalStyles.navlink +
    (isActive ? ` ${globalStyles['navlink--active']}` : '');

  return (
    <>
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
              wishlistTotalQty ? ICON_TYPE.HEART_FULL : ICON_TYPE.HEART_EMPTY
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
    </>
  );
};

SignedInMenu.propTypes = {
  close: PropTypes.func.isRequired,
};

export default SignedInMenu;
