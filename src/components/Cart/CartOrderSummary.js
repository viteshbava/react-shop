import React from "react";
import Card from "../UI/Card/Card";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import { useSelector } from "react-redux";
import toDollars from "../../utilities/toDollars";
import styles from "./CartOrderSummary.module.css";

const CartOrderSummary = () => {
  const itemSubtotal = useSelector((state) => state.cart.totalItemPrice);

  const orderTotal =
    itemSubtotal; /* this is where additional fees etc would be added */

  return (
    <div>
      <Card className={styles["summary-wrapper"]}>
        <h3 className={styles.heading}>Order Summary</h3>
        <p className={styles["summary__row"]}>
          <span>Item(s) subtotal</span>
          <span>{toDollars(itemSubtotal)}</span>
        </p>
        <p className={styles["summary__row"]}>
          <span>Shipping</span>
          <span>FREE</span>
        </p>
        <p className={`${styles["summary__row"]} ${styles["order-total"]}`}>
          <span>Order Total</span>
          <span>{toDollars(orderTotal)}</span>
        </p>
      </Card>
      <div className={styles["summary-actions"]}>
        <Button>Checkout</Button>
        <Button style={BTN_TYPE.SECONDARY}>Continue Shopping</Button>
      </div>
    </div>
  );
};

export default CartOrderSummary;
