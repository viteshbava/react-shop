import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toDollars from '../../utilities/toDollars';
import { removeFromWishlist } from '../../redux/actions/wishlist-actions';
import styles from './WishlistItem.module.css';

const WishlistItem = ({ product, className }) => {
  const dispatch = useDispatch();
  const { id, title, price, image } = product;

  const removeProductHandler = () => dispatch(removeFromWishlist(id));

  let wrapperClasses = styles['item-wrapper'];
  if (className) wrapperClasses += ` ${className}`;

  return (
    <li className={wrapperClasses}>
      <button
        type="button"
        onClick={removeProductHandler}
        className={styles.close}
      >
        &times;
      </button>
      <Link className={styles['image-wrapper']} to={`/products/${id}`}>
        <img className={styles.image} src={image} alt="product" />
      </Link>
      <div className={styles['item-details']}>
        <h3 className={styles['item-details__product-name']}>
          <Link to={`/products/${id}`}>{title}</Link>
        </h3>
        <p className={styles['item-details__product-id']}>
          Product ID: <span>{id}</span>
        </p>
        <p className={styles['item-details__price']}>{toDollars(price)}</p>
      </div>
    </li>
  );
};

WishlistItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

WishlistItem.defaultProps = {
  className: null,
};

export default WishlistItem;
