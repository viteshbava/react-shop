import React from "react";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import styles from "./AddToCartSummary.module.css";

const AddToCartSummary = () => {
  return (
    <Card className={styles.wrapper}>
      <div className={styles.header}>
        <h2>1 item(s) added to your cart</h2>
        <button className={styles.close}>&times;</button>
      </div>
      <div className={styles.body}>
        <p>
          <span className={styles["cart-subtotal-label"]}>Cart Subtotal</span> |
          2 items
        </p>
        <p className={styles["cart-subtotal-value"]}>$436.36</p>
      </div>

      <div className={styles.actions}>
        <Button>
          <Icon icon={ICON_TYPE.CART} />
          View Cart
        </Button>
        <Button style={BTN_TYPE.SECONDARY}>Continue Shopping</Button>
      </div>
    </Card>
  );
};

export default AddToCartSummary;
