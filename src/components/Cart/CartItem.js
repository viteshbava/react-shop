import React from "react";
import Control, { CONTROL_TYPE } from "../UI/Control/Control";
import styles from "./CartItem.module.css";

const CartItem = ({ url }) => {
  return (
    <li className={styles["item-wrapper"]}>
      <div className={styles["image-wrapper"]}>
        <img className={styles.image} src={url} alt="Product Image" />
      </div>
      <div className={styles["item-details"]}>
        <div className={styles["item-details__header"]}>
          <h3 className={styles["product-name"]}>
            Extra Stretch Dry Long Sleeve T-Shirt
          </h3>
          <button className={styles.close}>&times;</button>
        </div>
        <p className={styles["product-id"]}>
          Product ID: <span>123456</span>
        </p>
        <p className={styles.price}>$109.95</p>
        <div className={styles["item-details__footer"]}>
          <Control
            label="Quantity"
            className={styles.quantity}
            type={CONTROL_TYPE.SELECT}
            options={[1, 2, 3, 4, 5]}
            attributes={{ id: "quantity" }}
          />
          <p className={styles.subtotal}>
            Subtotal: <span className={styles["subtotal__value"]}>$218.18</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
