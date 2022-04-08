import PropTypes from 'prop-types';
import styles from './NavTopLeft.module.css';
import Hamburger from '../../../UI/Hamburger/Hamburger';
import Logo from '../Logo/Logo';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../../../../redux/actions/wishlist-actions';

const NavTopLeft = ({ className, hamburgerClickHandler }) => {
  const navClasses = styles.wrapper + (className ? ` ${className}` : '');
  const dispatch = useDispatch();

  const onAddHandler = () => {
    const product = {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: {
        rate: 3.9,
        count: 120,
      },
    };
    dispatch(addToWishlist(product));
  };

  return (
    <nav className={navClasses}>
      <div className={styles['hamburger-display-control']}>
        <Hamburger
          className={styles.hamburger}
          onClick={hamburgerClickHandler}
        />
      </div>
      <Logo />
      <button onClick={onAddHandler} type="button">
        Add
      </button>
    </nav>
  );
};

NavTopLeft.propTypes = {
  className: PropTypes.string,
  hamburgerClickHandler: PropTypes.func,
};
NavTopLeft.defaultProps = {
  className: null,
  hamburgerClickHandler: () => {},
};

export default NavTopLeft;
