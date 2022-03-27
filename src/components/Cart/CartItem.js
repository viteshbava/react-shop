import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import NumberButtons from '../UI/Control/NumberButtons';
import toDollars from '../../utilities/toDollars';
import styles from './CartItem.module.css';
import {
  removeFromCart,
  changeQuantity,
} from '../../redux/actions/cart-actions';
import ModalContext from '../../context/modal-context';

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, image, quantity } = product;
  const subTotal = price * quantity;

  const modal = useContext(ModalContext);

  const removeProductHandler = () => {
    modal.showModal({
      type: 'confirm',
      variant: 'warning',
      title: 'Remove product from cart?',
      body: 'Are you sure you want to remove this from your cart?',
      okText: 'Remove Items',
      onConfirm: () => dispatch(removeFromCart(id)),
    });
  };

  const qtyUpdateHandler = (newVal, undoUpdate) =>
    dispatch(
      changeQuantity({
        productId: id,
        quantity: newVal,
        onError: undoUpdate,
      })
    );

  return (
    <li className={styles['item-wrapper']}>
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
        <div className={styles['item-details__footer']}>
          <NumberButtons
            className={styles.footer__quantity}
            label="Quantity"
            id="quantity"
            min={1}
            max={10}
            value={quantity}
            onUpdate={qtyUpdateHandler}
          />
          <p className={styles.footer__subtotal}>
            Subtotal:{' '}
            <span className={styles.subtotal__value}>
              {toDollars(subTotal)}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};

// const { id, title, price, image, quantity } = product;

export default CartItem;
