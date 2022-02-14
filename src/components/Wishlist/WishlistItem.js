import React from "react";
import toDollars from "../../utilities/toDollars";
import styles from "./WishlistItem.module.css";

const WishlistItem = ({ product }) => {
  const { id, title, price, image, quantity } = product;

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
      </div>
    </li>
  );
};

export default WishlistItem;
