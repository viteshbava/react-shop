import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import toDollars from '../../utilities/toDollars';
import styles from './CartOrderSummary.module.css';

import ModalContext from '../../context/modal-context';

const CartOrderSummary = () => {
  const itemSubtotal = useSelector((state) => state.cart.totalItemPrice);
  const modal = useContext(ModalContext);

  const orderTotal =
    itemSubtotal; /* this is where additional fees etc would be added */

  const onCheckoutClickHandler = () => {
    modal.showModal({
      type: 'alert',
      variant: 'error',
      title: 'Checkout Not Ready!',
      body: 'The checkout feature has not yet been built.  Sorry!',
    });
  };

  return (
    <div>
      <Card className={styles['summary-wrapper']}>
        <h3 className={styles.heading}>Order Summary</h3>
        <p className={styles.summary__row}>
          <span>Item(s) subtotal</span>
          <span>{toDollars(itemSubtotal)}</span>
        </p>
        <p className={styles.summary__row}>
          <span>Shipping</span>
          <span>FREE</span>
        </p>
        <p className={`${styles.summary__row} ${styles['order-total']}`}>
          <span>Order Total</span>
          <span>{toDollars(orderTotal)}</span>
        </p>
      </Card>
      <div className={styles['summary-actions']}>
        <Button
          className={styles['summary-actions__action']}
          onClick={onCheckoutClickHandler}
        >
          Checkout
        </Button>
        <Button
          className={styles['summary-actions__action']}
          link="/"
          variant="outlined"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default CartOrderSummary;
