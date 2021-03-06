import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import NavAuthItem from '../NavAuthItem';
import localStyles from './NavTopRightDesktop.module.css';
import globalStyles from '../_NavGlobal.module.css';
import SignedInInfo from '../SignedInInfo/SignedInInfo';
import Button from '../../../UI/Button/Button';
import Icon, { ICON_TYPE } from '../../../UI/Icon/Icon';

const NavTopRightDesktop = ({ className }) => {
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQty = useSelector((state) => state.wishlist.totalQuantity);

  const navClasses = localStyles.wrapper + (className ? ` ${className}` : '');

  const navLinkActive = ({ isActive }) =>
    globalStyles.navlink +
    (isActive ? ` ${globalStyles['navlink--active']}` : '');

  return (
    <nav className={navClasses}>
      <SignedInInfo />
      <ul>
        <NavAuthItem authRequired={false}>
          <li className={localStyles['ml-extra']}>
            <Button
              variant="outlined"
              icon={<Icon icon={ICON_TYPE.REGISTER} />}
              link="/register"
            >
              Register
            </Button>
          </li>
          <li>
            <Button icon={<Icon icon={ICON_TYPE.SIGNIN} />} link="/signin">
              Sign in
            </Button>
          </li>
        </NavAuthItem>
        <NavAuthItem authRequired>
          <li>
            <NavLink to="/wishlist" className={navLinkActive}>
              <Icon
                icon={
                  wishlistTotalQty
                    ? ICON_TYPE.HEART_FULL
                    : ICON_TYPE.HEART_EMPTY
                }
              />
              Wishlist{wishlistTotalQty !== null && ` (${wishlistTotalQty})`}
            </NavLink>
          </li>
          <li>
            <Button
              variant={cartTotalQty ? 'filled' : 'outlined'}
              icon={<Icon icon={ICON_TYPE.CART} />}
              link="/cart"
            >
              Cart{cartTotalQty !== null && ` (${cartTotalQty})`}
            </Button>
          </li>
        </NavAuthItem>
      </ul>
    </nav>
  );
};

NavTopRightDesktop.propTypes = {
  className: PropTypes.string,
};

NavTopRightDesktop.defaultProps = {
  className: null,
};

export default NavTopRightDesktop;
