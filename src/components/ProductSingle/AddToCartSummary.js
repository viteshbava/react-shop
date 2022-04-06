import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon, { ICON_TYPE } from '../UI/Icon/Icon';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import styles from './AddToCartSummary.module.css';
import toDollars from '../../utilities/toDollars';

import ModalContext from '../../context/modal-context';

const AddToCartSummary = ({ numItemsAdded, className }) => {
  const { totalQuantity, totalItemPrice: cartSubtotal } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();

  const modalCtx = useContext(ModalContext);
  const closeModal = () => modalCtx.hideModal();

  const viewCartHandler = () => {
    closeModal();
    navigate('/cart');
  };

  let cardClasses = styles.wrapper;
  cardClasses += ` ${styles['wrapper--success']}`;
  if (className) cardClasses += ` ${className}`;

  return (
    <Card className={cardClasses}>
      <button
        type="button"
        onClick={closeModal}
        className={styles['close-button']}
      >
        &times;
      </button>
      <div className={styles.header}>
        <h2 className={styles.header__title}>
          {numItemsAdded} item(s) added to your cart
        </h2>
      </div>
      <div className={styles.body}>
        <p>
          <span className={styles['cart-subtotal-label']}>Cart Subtotal</span> |{' '}
          {totalQuantity} items
        </p>
        <p className={styles['cart-subtotal-value']}>
          {toDollars(cartSubtotal)}
        </p>
      </div>
      <div className={styles.actions}>
        <Button onClick={closeModal} variant="outlined">
          Continue Shopping
        </Button>
        <Button onClick={viewCartHandler} icon={<Icon icon={ICON_TYPE.CART} />}>
          View Cart
        </Button>
      </div>
    </Card>
  );
};

AddToCartSummary.propTypes = {
  numItemsAdded: PropTypes.number.isRequired,
};

export default AddToCartSummary;
