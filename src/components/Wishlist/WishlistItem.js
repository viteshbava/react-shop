import React from "react";
import styles from "./WishlistItem.module.css";

const WishlistItem = ({ url }) => {
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
      </div>
    </li>
  );
};

export default WishlistItem;
