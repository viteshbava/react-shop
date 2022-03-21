import React from "react";
import toDollars from "../../utilities/toDollars";
import { removeFromWishlist } from "../../redux/actions/wishlist-actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./WishlistItem.module.css";

const WishlistItem = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, image } = product;

  const removeProductHandler = () => dispatch(removeFromWishlist(id));

  return (
    <li className={styles["item-wrapper"]}>
      <button onClick={removeProductHandler} className={styles.close}>
        &times;
      </button>
      <Link className={styles["image-wrapper"]} to={`/products/${id}`}>
        <img className={styles.image} src={image} alt="product" />
      </Link>
      <div className={styles["item-details"]}>
        <h3 className={styles["item-details__product-name"]}>
          <Link to={`/products/${id}`}>{title}</Link>
        </h3>
        <p className={styles["item-details__product-id"]}>
          Product ID: <span>{id}</span>
        </p>
        <p className={styles["item-details__price"]}>{toDollars(price)}</p>
      </div>
    </li>
  );
};

export default WishlistItem;
