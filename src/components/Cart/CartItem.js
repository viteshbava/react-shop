import React from "react";
import Control, { CONTROL_TYPE } from "../UI/Control/Control";
import toDollars from "../../utilities/toDollars";
import { cartParams } from "../../config/parameters";
import styles from "./CartItem.module.css";

const CartItem = ({ product }) => {
  const { id, title, price, image, quantity } = product;
  const subTotal = price * quantity;
  return (
    <li className={styles["item-wrapper"]}>
      <div className={styles["image-wrapper"]}>
        <img className={styles.image} src={image} alt="Product Image" />
      </div>
      <div className={styles["item-details"]}>
        <div className={styles["item-details__header"]}>
          <h3 className={styles["product-name"]}>{title}</h3>
          <button className={styles.close}>&times;</button>
        </div>
        <p className={styles["product-id"]}>
          Product ID: <span>{id}</span>
        </p>
        <p className={styles.price}>{toDollars(price)}</p>
        <div className={styles["item-details__footer"]}>
          <Control
            label="Quantity"
            className={styles.quantity}
            type={CONTROL_TYPE.SELECT}
            options={Array.from(
              { length: cartParams.maxQuantity },
              (_, i) => i + 1
            )}
            attributes={{ id: "quantity" }}
            selected={quantity}
          />
          <p className={styles.subtotal}>
            Subtotal:{" "}
            <span className={styles["subtotal__value"]}>
              {toDollars(subTotal)}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
