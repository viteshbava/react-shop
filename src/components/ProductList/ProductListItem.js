import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../UI/Card/Card';
import styles from './ProductListItem.module.css';
import toDollars from '../../utilities/toDollars';
import Icon, { ICON_TYPE } from '../UI/Icon/Icon';
import {
  removeFromWishlist,
  addToWishlist,
} from '../../redux/actions/wishlist-actions';

const ProductListItem = ({ product }) => {
  const { products: wishlistProducts, isLoading: wishlistIsLoading } =
    useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const foundProduct = wishlistProducts.find((p) => p.id === product.id);
    setInWishlist(!!foundProduct);
  }, [product, wishlistProducts]);

  const toggleWishlistHandler = (e) => {
    e.preventDefault();
    if (inWishlist) dispatch(removeFromWishlist(product.id));
    else dispatch(addToWishlist(product));
  };

  const wishListIcon = inWishlist
    ? ICON_TYPE.HEART_FULL
    : ICON_TYPE.HEART_EMPTY;

  const wishlistBtnClasses =
    styles['wishlist-toggle'] +
    (wishlistIsLoading ? ` ${styles['wishlist-toggle--read-only']}` : '');

  const trimText = (text, maxLength = 30) =>
    text.length > maxLength ? `${text.substring(0, maxLength + 1)} ...` : text;

  return (
    <li className={styles['grid-flex']}>
      <Link to={`/products/${product.id}`}>
        <Card className={styles.wrapper}>
          <div className={styles['image-wrapper']}>
            <button
              type="button"
              title="Add to wishlist"
              className={wishlistBtnClasses}
              onClick={toggleWishlistHandler}
            >
              <Icon icon={wishListIcon} />
            </button>
            <img className={styles.image} src={product.image} alt="product" />
          </div>
          <h2 className={styles.heading}>{trimText(product.title)}</h2>
          <h1 className={styles.price}>{toDollars(product.price)}</h1>
        </Card>
      </Link>
    </li>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductListItem;
