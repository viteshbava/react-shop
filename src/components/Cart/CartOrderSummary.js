import React from "react";
import Card from "../UI/Card/Card";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import styles from "./CartOrderSummary.module.css";

const CartOrderSummary = () => {
  return (
    <div>
      <Card className={styles["summary-wrapper"]}>
        <h3 className={styles.heading}>Order Summary</h3>
        <p className={styles["summary__row"]}>
          <span>Items(s) subtotal</span>
          <span>$436.36</span>
        </p>
        <p className={styles["summary__row"]}>
          <span>Shipping</span>
          <span>FREE</span>
        </p>
        <p className={`${styles["summary__row"]} ${styles["order-total"]}`}>
          <span>Order Total</span>
          <span>$436.36</span>
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
